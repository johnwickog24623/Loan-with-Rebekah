import re
from datetime import datetime

def normalize_phone(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)
    if len(digits) == 10:
        return f"+1{digits}"
    if len(digits) > 10 and not phone.startswith("+"):
        return f"+{digits}"
    return phone

def format_datetime_display(date_str: str, time_str: str) -> str:
    try:
        dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
        return dt.strftime("%A, %B %d, %Y at %I:%M %p")
    except ValueError:
        return f"{date_str} at {time_str}"
