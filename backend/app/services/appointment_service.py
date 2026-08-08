from datetime import datetime, timedelta
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.repositories.appointment_repository import AppointmentRepository
from app.repositories.google_account_repository import GoogleAccountRepository
from app.services.customer_service import CustomerService
from app.services.google_calendar_service import GoogleCalendarService
from app.services.email_service import EmailService
from app.schemas.appointment import BookAppointmentRequest, BookAppointmentResponse

class AppointmentService:
    def __init__(self, db: Session):
        self.db = db
        self.appointment_repo = AppointmentRepository(db)
        self.customer_service = CustomerService(db)
        google_repo = GoogleAccountRepository(db)
        account = google_repo.get_first()
        access_token = account.access_token if account else None
        refresh_token = account.refresh_token if account else None
        calendar_id = account.calendar_id if account else "primary"
        self.calendar_service = GoogleCalendarService(access_token=access_token, refresh_token=refresh_token, calendar_id=calendar_id)
        self.email_service = EmailService()

    def _calculate_end_time(self, start_time: str, duration_minutes: int = 30) -> str:
        t = datetime.strptime(start_time, "%H:%M")
        end_t = t + timedelta(minutes=duration_minutes)
        return end_t.strftime("%H:%M")

    def book_appointment(self, req: BookAppointmentRequest) -> BookAppointmentResponse:
        existing_appointments = self.appointment_repo.get_by_date(req.date)
        booked_bookings = [{"date": a.appointment_date, "start_time": a.start_time} for a in existing_appointments]
        booked_times = [a.start_time for a in existing_appointments]
        is_available = self.calendar_service.check_availability(req.date, req.time, booked_bookings)
        if not is_available:
            available_slots = self.calendar_service.generate_available_slots(req.date, booked_times)
            return BookAppointmentResponse(
                success=False,
                message=f"Time slot {req.time} on {req.date} is unavailable.",
                available_slots=available_slots
            )
        customer = self.customer_service.get_or_create_customer(
            full_name=req.customer_name,
            phone=req.phone,
            email=req.email
        )
        end_time = self._calculate_end_time(req.time)
        event_id = self.calendar_service.create_event(
            summary=f"Appointment: {req.service}",
            description=f"Appointment for {req.customer_name} ({req.phone}) - {req.service}",
            date=req.date,
            start_time=req.time,
            end_time=end_time,
            attendee_email=req.email
        )
        appointment = self.appointment_repo.create(
            customer_id=customer.id,
            service=req.service,
            appointment_date=req.date,
            start_time=req.time,
            end_time=end_time,
            google_event_id=event_id
        )
        if req.email:
            self.email_service.send_confirmation_email(
                customer_name=req.customer_name,
                customer_email=req.email,
                service=req.service,
                date=req.date,
                time=req.time
            )
        return BookAppointmentResponse(
            success=True,
            message="Appointment booked successfully.",
            appointment_id=appointment.id,
            google_event_id=event_id,
            available_slots=None
        )

    def get_available_slots(self, date: str) -> List[str]:
        existing = self.appointment_repo.get_by_date(date)
        booked_times = [a.start_time for a in existing]
        return self.calendar_service.generate_available_slots(date, booked_times)
