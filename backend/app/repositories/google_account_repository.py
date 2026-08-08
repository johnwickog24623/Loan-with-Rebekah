import datetime
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.google_account import GoogleAccount

class GoogleAccountRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> Optional[GoogleAccount]:
        stmt = select(GoogleAccount).where(GoogleAccount.google_email == email)
        return self.db.execute(stmt).scalars().first()

    def get_first(self) -> Optional[GoogleAccount]:
        stmt = select(GoogleAccount)
        return self.db.execute(stmt).scalars().first()

    def save_account(
        self,
        google_email: str,
        access_token: str,
        refresh_token: str,
        expires_in: int = 3600,
        business_id: Optional[int] = None,
        calendar_id: str = "primary"
    ) -> GoogleAccount:
        expiry = datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in)
        account = self.get_by_email(google_email)
        if account:
            account.access_token = access_token
            if refresh_token:
                account.refresh_token = refresh_token
            account.token_expiry = expiry
            account.calendar_id = calendar_id
            if business_id is not None:
                account.business_id = business_id
        else:
            account = GoogleAccount(
                google_email=google_email,
                access_token=access_token,
                refresh_token=refresh_token,
                token_expiry=expiry,
                business_id=business_id,
                calendar_id=calendar_id
            )
            self.db.add(account)
        self.db.commit()
        self.db.refresh(account)
        return account
