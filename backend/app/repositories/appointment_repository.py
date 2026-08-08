from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.appointment import Appointment, AppointmentStatus

class AppointmentRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, appointment_id: int) -> Optional[Appointment]:
        return self.db.get(Appointment, appointment_id)

    def create(self, customer_id: int, service: str, appointment_date: str, start_time: str, end_time: str, google_event_id: Optional[str] = None, business_id: Optional[int] = None) -> Appointment:
        appointment = Appointment(
            customer_id=customer_id,
            business_id=business_id,
            service=service,
            appointment_date=appointment_date,
            start_time=start_time,
            end_time=end_time,
            google_event_id=google_event_id,
            status=AppointmentStatus.CONFIRMED
        )
        self.db.add(appointment)
        self.db.commit()
        self.db.refresh(appointment)
        return appointment

    def get_by_date(self, appointment_date: str) -> List[Appointment]:
        stmt = select(Appointment).where(Appointment.appointment_date == appointment_date, Appointment.status != AppointmentStatus.CANCELLED)
        return list(self.db.execute(stmt).scalars().all())

    def list(self, limit: int = 10, offset: int = 0) -> List[Appointment]:
        stmt = select(Appointment).offset(offset).limit(limit)
        return list(self.db.execute(stmt).scalars().all())

    def count(self) -> int:
        stmt = select(Appointment)
        return len(list(self.db.execute(stmt).scalars().all()))
