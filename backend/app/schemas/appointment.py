from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class BookAppointmentRequest(BaseModel):
    customer_name: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=5)
    email: Optional[EmailStr] = None
    service: str = Field(..., min_length=1)
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    time: str = Field(..., pattern=r"^\d{2}:\d{2}$")

class BookAppointmentResponse(BaseModel):
    success: bool
    message: str
    appointment_id: Optional[int] = None
    google_event_id: Optional[str] = None
    available_slots: Optional[List[str]] = None

class SlotSearchQuery(BaseModel):
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    service: Optional[str] = None
