from unittest.mock import patch, MagicMock
from app.repositories.google_account_repository import GoogleAccountRepository
from app.core.security import decrypt_token

def test_google_login_endpoint(client):
    response = client.get("/api/v1/google/login")
    assert response.status_code == 200
    json_data = response.json()
    assert json_data["error"] is None
    assert "accounts.google.com" in json_data["data"]["auth_url"]

def test_google_callback_success(client, test_db):
    mock_token_response = MagicMock()
    mock_token_response.status_code = 200
    mock_token_response.json.return_value = {
        "access_token": "mock_access_token_123",
        "refresh_token": "mock_refresh_token_456",
        "expires_in": 3600
    }
    mock_userinfo_response = MagicMock()
    mock_userinfo_response.status_code = 200
    mock_userinfo_response.json.return_value = {
        "email": "testuser@example.com"
    }
    def mock_post(url, *args, **kwargs):
        if "oauth2/v2/userinfo" in url or "userinfo" in str(kwargs):
            return mock_userinfo_response
        return mock_token_response
    def mock_get(url, *args, **kwargs):
        return mock_userinfo_response
    with patch("httpx.post", side_effect=mock_post), patch("httpx.get", side_effect=mock_get):
        response = client.get("/api/v1/google/callback?code=mock_authorization_code", follow_redirects=False)
        assert response.status_code == 307
        assert "http://localhost:3000/admin?status=connected" in response.headers["location"]
        repo = GoogleAccountRepository(test_db)
        account = repo.get_by_email("testuser@example.com")
        assert account is not None
        assert account.access_token == "mock_access_token_123"
        assert decrypt_token(account.refresh_token) == "mock_refresh_token_456"
