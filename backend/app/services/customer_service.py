from typing import Optional
from sqlalchemy.orm import Session
from app.repositories.customer_repository import CustomerRepository
from app.models.customer import Customer

class CustomerService:
    def __init__(self, db: Session):
        self.repo = CustomerRepository(db)

    def get_or_create_customer(self, full_name: str, phone: str, email: Optional[str] = None) -> Customer:
        existing = self.repo.get_by_phone(phone)
        if not existing and email:
            existing = self.repo.get_by_email(email)
        if existing:
            return existing
        return self.repo.create(full_name=full_name, phone=phone, email=email)
