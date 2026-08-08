def test_book_appointment_success_with_email(client):
    payload = {
        "customer_name": "John Doe",
        "phone": "+15551234567",
        "email": "john.doe@example.com",
        "service": "Mortgage Consultation",
        "date": "2026-09-01",
        "time": "10:00"
    }
    response = client.post("/api/v1/appointments/book", json=payload)
    assert response.status_code == 200
    body = response.json()
    assert body["data"]["success"] is True
    assert body["data"]["appointment_id"] is not None
    assert body["error"] is None

def test_book_appointment_success_without_email(client):
    payload = {
        "customer_name": "Caller Without Email",
        "phone": "+15559998877",
        "service": "Refinance Inquiry",
        "date": "2026-09-01",
        "time": "14:00"
    }
    response = client.post("/api/v1/appointments/book", json=payload)
    assert response.status_code == 200
    body = response.json()
    assert body["data"]["success"] is True
    assert body["data"]["appointment_id"] is not None
    assert body["error"] is None

def test_book_appointment_conflict(client):
    payload = {
        "customer_name": "Jane Smith",
        "phone": "+15559876543",
        "email": "jane.smith@example.com",
        "service": "Refinance Call",
        "date": "2026-09-01",
        "time": "10:00"
    }
    response = client.post("/api/v1/appointments/book", json=payload)
    assert response.status_code == 200
    body = response.json()
    assert body["data"]["success"] is False
    assert "10:00" not in body["data"]["available_slots"]
    assert len(body["data"]["available_slots"]) > 0

def test_list_customers_paginated(client):
    response = client.get("/api/v1/customers?limit=5&offset=0")
    assert response.status_code == 200
    body = response.json()
    assert len(body["data"]) >= 1
    assert body["meta"]["total"] >= 1
    assert body["meta"]["limit"] == 5
    assert body["meta"]["offset"] == 0

def test_google_login_endpoint(client):
    response = client.get("/api/v1/google/login")
    assert response.status_code == 200
    body = response.json()
    assert "auth_url" in body["data"]
