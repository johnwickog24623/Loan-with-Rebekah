from app.schemas.envelope import APIResponse, ErrorInfo, MetaInfo
from app.schemas.customer import CustomerBase, CustomerCreate, CustomerResponse
from app.schemas.appointment import BookAppointmentRequest, BookAppointmentResponse, SlotSearchQuery
from app.schemas.google import GoogleLoginResponse, GoogleAccountResponse

__all__ = [
    "APIResponse", "ErrorInfo", "MetaInfo",
    "CustomerBase", "CustomerCreate", "CustomerResponse",
    "BookAppointmentRequest", "BookAppointmentResponse", "SlotSearchQuery",
    "GoogleLoginResponse", "GoogleAccountResponse"
]
