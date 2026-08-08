from app.utils.helpers import normalize_phone, format_datetime_display

def test_normalize_phone():
    assert normalize_phone("5551234567") == "+15551234567"
    assert normalize_phone("+15551234567") == "+15551234567"
    assert normalize_phone("15551234567") == "+15551234567"

def test_format_datetime_display():
    result = format_datetime_display("2026-09-01", "10:00")
    assert "Tuesday, September 01, 2026 at 10:00 AM" in result
