import httpx
from fastapi import APIRouter, Query, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.schemas.envelope import APIResponse
from app.schemas.google import GoogleLoginResponse
from app.core.config import settings
from app.core.security import encrypt_token
from app.database.database import get_db
from app.repositories.google_account_repository import GoogleAccountRepository

router = APIRouter(prefix="/api/v1/google", tags=["Google OAuth"])

@router.get("/status")
def google_status(db: Session = Depends(get_db)):
    repo = GoogleAccountRepository(db)
    account = repo.get_first()
    if not account:
        return APIResponse.success(data={"connected": False, "google_email": None, "calendar_id": None})
    return APIResponse.success(data={
        "connected": True,
        "google_email": account.google_email,
        "calendar_id": account.calendar_id
    })

@router.get("/login", response_model=APIResponse[GoogleLoginResponse])
def google_login():
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={settings.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={settings.GOOGLE_REDIRECT_URI}&"
        f"response_type=code&"
        f"scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email&"
        f"access_type=offline&prompt=consent"
    )
    return APIResponse.success(data=GoogleLoginResponse(auth_url=auth_url))

@router.get("/callback")
def google_callback(
    request: Request,
    code: str = Query(...),
    redirect: str = Query("true"),
    db: Session = Depends(get_db)
):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": settings.GOOGLE_REDIRECT_URI
    }
    token_response = httpx.post(token_url, data=payload)
    if token_response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to exchange Google OAuth code: {token_response.text}"
        )
    token_data = token_response.json()
    access_token = token_data.get("access_token", "")
    refresh_token = token_data.get("refresh_token", "")
    expires_in = token_data.get("expires_in", 3600)
    userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    userinfo_response = httpx.get(
        userinfo_url,
        headers={"Authorization": f"Bearer {access_token}"}
    )
    if userinfo_response.status_code != 200:
        google_email = "connected-account@google.com"
    else:
        google_email = userinfo_response.json().get("email", "connected-account@google.com")
    encrypted_refresh = encrypt_token(refresh_token) if refresh_token else ""
    repo = GoogleAccountRepository(db)
    account = repo.save_account(
        google_email=google_email,
        access_token=access_token,
        refresh_token=encrypted_refresh,
        expires_in=expires_in
    )
    if redirect == "false" or request.headers.get("accept") == "application/json":
        return APIResponse.success(data={
            "status": "connected",
            "message": "Google Account authorization recorded successfully.",
            "google_email": account.google_email,
            "calendar_id": account.calendar_id
        })
    frontend_admin_url = f"http://localhost:3000/admin?status=connected&email={account.google_email}"
    return RedirectResponse(url=frontend_admin_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT)
