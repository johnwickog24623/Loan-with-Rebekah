from typing import Optional
from app.core.logger import logger

class EmailService:
    def send_confirmation_email(self, customer_name: str, customer_email: Optional[str], service: str, date: str, time: str) -> bool:
        if not customer_email:
            logger.info(f"Skipping confirmation email for {customer_name}: no email provided.")
            return False
        logger.info(f"Confirmation email dispatched to {customer_email} ({customer_name}) for {service} on {date} at {time}")
        return True
