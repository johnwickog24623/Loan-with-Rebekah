from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.database.base import Base
from app.database.database import engine
from app.core.exceptions import AppointmentBookingError
from app.schemas.envelope import APIResponse
from app.api import health_router, appointments_router, customers_router, google_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Voice Appointment Booking System API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(AppointmentBookingError)
def domain_exception_handler(request: Request, exc: AppointmentBookingError):
    envelope = APIResponse.fail(message=exc.message, code=exc.code)
    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content=envelope.model_dump())

@app.exception_handler(RequestValidationError)
def validation_exception_handler(request: Request, exc: RequestValidationError):
    envelope = APIResponse.fail(message="Request validation error", code="INVALID_INPUT", details=exc.errors())
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=envelope.model_dump())

@app.exception_handler(Exception)
def generic_exception_handler(request: Request, exc: Exception):
    envelope = APIResponse.fail(message="An unexpected server error occurred", code="INTERNAL_SERVER_ERROR")
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=envelope.model_dump())

app.include_router(health_router)
app.include_router(appointments_router)
app.include_router(customers_router)
app.include_router(google_router)
