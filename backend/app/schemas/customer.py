from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class CustomerBase(BaseModel):
    full_name: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=5)
    email: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}
