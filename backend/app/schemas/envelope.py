from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel

T = TypeVar("T")

class ErrorInfo(BaseModel):
    code: str
    message: str
    details: Optional[Any] = None

class MetaInfo(BaseModel):
    total: Optional[int] = None
    limit: Optional[int] = None
    offset: Optional[int] = None

class APIResponse(BaseModel, Generic[T]):
    data: Optional[T] = None
    error: Optional[ErrorInfo] = None
    meta: Optional[MetaInfo] = None

    @classmethod
    def success(cls, data: T, meta: Optional[MetaInfo] = None) -> "APIResponse[T]":
        return cls(data=data, error=None, meta=meta or MetaInfo())

    @classmethod
    def fail(cls, message: str, code: str = "ERROR", details: Optional[Any] = None) -> "APIResponse[T]":
        return cls(data=None, error=ErrorInfo(code=code, message=message, details=details), meta=MetaInfo())
