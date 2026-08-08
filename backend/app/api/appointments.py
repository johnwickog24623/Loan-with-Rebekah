import json
import re
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, Query, Request, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.envelope import APIResponse
from app.schemas.appointment import BookAppointmentRequest, BookAppointmentResponse
from app.services.appointment_service import AppointmentService
from app.core.logger import logger

router = APIRouter(prefix="/api/v1/appointments", tags=["Appointments"])

def _normalize_time(val: Optional[str]) -> str:
    if not val:
        return "10:00"
    v = str(val).strip().upper()
    match = re.search(r"(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?", v)
    if match:
        hr = int(match.group(1))
        mn = int(match.group(2)) if match.group(2) else 0
        ampm = match.group(3)
        if ampm == "PM" and hr < 12:
            hr += 12
        elif ampm == "AM" and hr == 12:
            hr = 0
        return f"{hr:02d}:{mn:02d}"
    return "10:00"

def _normalize_date(val: Optional[str]) -> str:
    if not val:
        return "2026-09-01"
    v = str(val).strip()
    match = re.match(r"^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$", v)
    if match:
        yr, mo, dy = match.groups()
        return f"{yr}-{int(mo):02d}-{int(dy):02d}"
    return v

def _normalize_phone(val: Optional[str]) -> str:
    if not val:
        return "+15550000000"
    digits = re.sub(r"\D", "", str(val))
    if len(digits) >= 5:
        return f"+{digits}"
    return "+15550000000"

def _extract_vapi_info(payload: Dict[str, Any]) -> tuple[Dict[str, Any], Optional[str]]:
    args = payload
    tool_call_id = None
    if isinstance(payload, dict) and "message" in payload:
        tool_calls = payload["message"].get("toolCalls", [])
        if tool_calls and isinstance(tool_calls[0], dict):
            tool_call_id = tool_calls[0].get("id")
            raw_args = tool_calls[0].get("function", {}).get("arguments", {})
            if isinstance(raw_args, str):
                try:
                    args = json.loads(raw_args)
                except Exception:
                    args = {}
            elif isinstance(raw_args, dict):
                args = raw_args
    if not isinstance(args, dict):
        args = {}
    return args, tool_call_id

@router.post("/book")
def book_appointment_post(request_data: Dict[str, Any], db: Session = Depends(get_db)):
    extracted, tool_call_id = _extract_vapi_info(request_data)
    try:
        norm_date = _normalize_date(extracted.get("date"))
        norm_time = _normalize_time(extracted.get("time"))
        norm_phone = _normalize_phone(extracted.get("phone"))
        raw_email = extracted.get("email") or None
        req = BookAppointmentRequest(
            customer_name=str(extracted.get("customer_name") or "Valued Caller"),
            phone=norm_phone,
            email=raw_email,
            service=str(extracted.get("service") or "Mortgage Consultation"),
            date=norm_date,
            time=norm_time
        )
        service = AppointmentService(db)
        result = service.book_appointment(req)
        if tool_call_id:
            if result.success:
                msg = f"Appointment successfully booked for {req.customer_name} on {req.date} at {req.time}. Event ID: {result.google_event_id}."
            else:
                msg = f"Failed to book appointment: {result.message}"
            return {
                "results": [
                    {
                        "toolCallId": tool_call_id,
                        "result": msg
                    }
                ]
            }
        return APIResponse.success(data=result)
    except Exception as err:
        db.rollback()
        logger.error(f"Error booking appointment: {err}")
        if tool_call_id:
            return {
                "results": [
                    {
                        "toolCallId": tool_call_id,
                        "result": f"Failed to book appointment due to validation issue: {err}"
                    }
                ]
            }
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Appointment booking failed: {err}"
        )

@router.api_route("/slots", methods=["GET", "POST"])
async def get_available_slots(
    request: Request,
    date: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    target_date = date
    tool_call_id = None
    if request.method == "POST":
        try:
            body = await request.json()
            extracted, tool_call_id = _extract_vapi_info(body)
            if not target_date:
                target_date = extracted.get("date")
        except Exception:
            pass
    target_date = _normalize_date(target_date)
    service = AppointmentService(db)
    slots = service.get_available_slots(target_date)
    if tool_call_id:
        slots_text = ", ".join(slots) if slots else "No slots available"
        return {
            "results": [
                {
                    "toolCallId": tool_call_id,
                    "result": f"Available appointment slots for {target_date}: {slots_text}"
                }
            ]
        }
    return APIResponse.success(data=slots)
