import uuid
import httpx
from typing import List, Dict, Any, Optional
from app.core.logger import logger
from app.core.config import settings
from app.core.security import decrypt_token

class GoogleCalendarService:
    def __init__(self, access_token: Optional[str] = None, refresh_token: Optional[str] = None, calendar_id: str = "primary"):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.calendar_id = calendar_id

    def check_availability(self, date: str, start_time: str, existing_bookings: List[Dict[str, str]]) -> bool:
        for booking in existing_bookings:
            if booking.get("date") == date and booking.get("start_time") == start_time:
                return False
        return True

    def _refresh_access_token(self) -> Optional[str]:
        if not self.refresh_token:
            return None
        raw_refresh = decrypt_token(self.refresh_token)
        if not raw_refresh:
            return None
        token_url = "https://oauth2.googleapis.com/token"
        payload = {
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "refresh_token": raw_refresh,
            "grant_type": "refresh_token"
        }
        try:
            res = httpx.post(token_url, data=payload, timeout=5.0)
            if res.status_code == 200:
                new_token = res.json().get("access_token")
                if new_token:
                    self.access_token = new_token
                    logger.info("Successfully refreshed Google access token.")
                    return new_token
            else:
                logger.error(f"Google token refresh failed with status {res.status_code}: {res.text}")
        except Exception as e:
            logger.error(f"Failed to refresh Google access token: {e}")
        return None

    def create_event(
        self,
        summary: str,
        description: str,
        date: str,
        start_time: str,
        end_time: str,
        attendee_email: Optional[str] = None
    ) -> str:
        if self.access_token:
            url = f"https://www.googleapis.com/calendar/v3/calendars/{self.calendar_id}/events"
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            start_iso = f"{date}T{start_time}:00Z"
            end_iso = f"{date}T{end_time}:00Z"
            payload: Dict[str, Any] = {
                "summary": summary,
                "description": description,
                "start": {"dateTime": start_iso, "timeZone": "UTC"},
                "end": {"dateTime": end_iso, "timeZone": "UTC"}
            }
            if attendee_email and "@example.com" not in attendee_email and ".local" not in attendee_email:
                payload["attendees"] = [{"email": attendee_email}]
            try:
                res = httpx.post(url, json=payload, headers=headers, timeout=5.0)
                if res.status_code in (200, 201):
                    event_id = res.json().get("id", f"gcal_{uuid.uuid4().hex[:12]}")
                    logger.info(f"Google Calendar live event created: {event_id}")
                    return event_id
                elif res.status_code == 401:
                    logger.info("Google access token 401 expired. Attempting token refresh...")
                    new_token = self._refresh_access_token()
                    if new_token:
                        headers["Authorization"] = f"Bearer {new_token}"
                        retry_res = httpx.post(url, json=payload, headers=headers, timeout=5.0)
                        if retry_res.status_code in (200, 201):
                            event_id = retry_res.json().get("id", f"gcal_{uuid.uuid4().hex[:12]}")
                            logger.info(f"Google Calendar live event created after token refresh: {event_id}")
                            return event_id
                        else:
                            logger.error(f"Google Calendar API retry failed with status {retry_res.status_code}: {retry_res.text}")
                else:
                    logger.error(f"Google Calendar API failed with status {res.status_code}: {res.text}")
            except Exception as e:
                logger.error(f"Failed to communicate with Google Calendar API: {e}")
        event_id = f"gcal_{uuid.uuid4().hex[:12]}"
        log_msg = f"Google Calendar mock event created: {event_id} on {date} at {start_time}"
        if attendee_email:
            log_msg += f" for {attendee_email}"
        logger.info(log_msg)
        return event_id

    def generate_available_slots(self, date: str, booked_times: List[str]) -> List[str]:
        standard_slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
        return [slot for slot in standard_slots if slot not in booked_times]
