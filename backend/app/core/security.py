from cryptography.fernet import Fernet
from app.core.config import settings

def _get_fernet() -> Fernet:
    key = settings.ENCRYPTION_KEY
    if len(key.encode("utf-8")) != 44:
        key = Fernet.generate_key().decode("utf-8")
    return Fernet(key.encode("utf-8"))

def encrypt_token(token: str) -> str:
    if not token:
        return ""
    fernet = _get_fernet()
    return fernet.encrypt(token.encode("utf-8")).decode("utf-8")

def decrypt_token(token: str) -> str:
    if not token:
        return ""
    fernet = _get_fernet()
    return fernet.decrypt(token.encode("utf-8")).decode("utf-8")
