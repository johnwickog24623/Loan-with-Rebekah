from app.api.health import router as health_router
from app.api.appointments import router as appointments_router
from app.api.customers import router as customers_router
from app.api.google import router as google_router

__all__ = ["health_router", "appointments_router", "customers_router", "google_router"]
