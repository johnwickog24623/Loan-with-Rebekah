class AppointmentBookingError(Exception):
    def __init__(self, message: str, code: str = "BOOKING_ERROR"):
        self.message = message
        self.code = code
        super().__init__(self.message)

class TimeSlotUnavailableError(AppointmentBookingError):
    def __init__(self, message: str = "Requested time slot is unavailable"):
        super().__init__(message=message, code="TIME_SLOT_UNAVAILABLE")

class CustomerNotFoundError(AppointmentBookingError):
    def __init__(self, message: str = "Customer not found"):
        super().__init__(message=message, code="CUSTOMER_NOT_FOUND")

class GoogleAuthRequiredError(AppointmentBookingError):
    def __init__(self, message: str = "Google authentication is required"):
        super().__init__(message=message, code="GOOGLE_AUTH_REQUIRED")

class InvalidAppointmentDataError(AppointmentBookingError):
    def __init__(self, message: str = "Invalid appointment details provided"):
        super().__init__(message=message, code="INVALID_APPOINTMENT_DATA")
