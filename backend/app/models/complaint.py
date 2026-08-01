from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.db import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String(255))
    email = Column(String(255))

    product_name = Column(String(255))
    batch_number = Column(String(100))

    complaint = Column(Text)
    complaint_summary = Column(Text)

    risk_level = Column(String(50))

    # ADD THIS
    recommendation = Column(Text)

    status = Column(String(50), default="Open")

    created_at = Column(DateTime(timezone=True), server_default=func.now())