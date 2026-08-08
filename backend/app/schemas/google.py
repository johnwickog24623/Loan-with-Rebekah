from pydantic import BaseModel

class GoogleLoginResponse(BaseModel):
    auth_url: str

class GoogleAccountResponse(BaseModel):
    id: int
    google_email: str
    calendar_id: str
    model_config = {"from_attributes": True}
