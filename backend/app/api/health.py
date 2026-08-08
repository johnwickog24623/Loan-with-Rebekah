from fastapi import APIRouter
from app.schemas.envelope import APIResponse

router = APIRouter(prefix="/api/v1", tags=["Health"])

@router.get("/health", response_model=APIResponse[dict])
def health_check():
    return APIResponse.success(data={"status": "healthy", "service": "AI Voice Appointment Booking System"})
