from typing import List
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.envelope import APIResponse, MetaInfo
from app.schemas.customer import CustomerCreate, CustomerResponse
from app.repositories.customer_repository import CustomerRepository

router = APIRouter(prefix="/api/v1/customers", tags=["Customers"])

@router.get("", response_model=APIResponse[List[CustomerResponse]])
def list_customers(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    repo = CustomerRepository(db)
    customers = repo.list(limit=limit, offset=offset)
    total = repo.count()
    meta = MetaInfo(total=total, limit=limit, offset=offset)
    data = [CustomerResponse.model_validate(c) for c in customers]
    return APIResponse.success(data=data, meta=meta)

@router.post("", response_model=APIResponse[CustomerResponse], status_code=status.HTTP_201_CREATED)
def create_customer(
    payload: CustomerCreate,
    db: Session = Depends(get_db)
):
    repo = CustomerRepository(db)
    customer = repo.get_or_create(
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email
    )
    data = CustomerResponse.model_validate(customer)
    return APIResponse.success(data=data)
