from typing import TypedDict


class ComplaintState(TypedDict):
    complaint: str
    customer_name: str
    product_name: str
    batch_number: str
    complaint_summary: str
    risk_level: str
    recommendation: str