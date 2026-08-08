from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.customer import Customer

class CustomerRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, customer_id: int) -> Optional[Customer]:
        return self.db.get(Customer, customer_id)

    def get_by_phone(self, phone: str) -> Optional[Customer]:
        stmt = select(Customer).where(Customer.phone == phone)
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_email(self, email: str) -> Optional[Customer]:
        if not email:
            return None
        stmt = select(Customer).where(Customer.email == email)
        return self.db.execute(stmt).scalar_one_or_none()

    def create(self, full_name: str, phone: str, email: Optional[str] = None) -> Customer:
        customer = Customer(full_name=full_name, phone=phone, email=email or "")
        self.db.add(customer)
        self.db.commit()
        self.db.refresh(customer)
        return customer

    def list(self, limit: int = 10, offset: int = 0) -> List[Customer]:
        stmt = select(Customer).offset(offset).limit(limit)
        return list(self.db.execute(stmt).scalars().all())

    def count(self) -> int:
        stmt = select(Customer)
        return len(list(self.db.execute(stmt).scalars().all()))
