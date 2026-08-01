from pydantic import BaseModel, EmailStr
from typing import Optional


class ComplaintCreate(BaseModel):
    customer_name: str
    email: Optional[EmailStr] = None
    product_name: str
    batch_number: str
    complaint: str
    complaint_summary: str
    risk_level: str
    recommendation: str


class ComplaintStatusUpdate(BaseModel):
    status: str