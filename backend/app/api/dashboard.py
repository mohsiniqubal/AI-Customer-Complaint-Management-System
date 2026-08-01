from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.db import get_db
from app.models.complaint import Complaint

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):

    total = db.query(Complaint).count()

    open_count = db.query(Complaint).filter(
        Complaint.status == "Open"
    ).count()

    investigation = db.query(Complaint).filter(
        Complaint.status == "Under Investigation"
    ).count()

    closed = db.query(Complaint).filter(
        Complaint.status == "Closed"
    ).count()

    critical = db.query(Complaint).filter(
        Complaint.risk_level == "Critical"
    ).count()

    return {
        "total": total,
        "open": open_count,
        "investigation": investigation,
        "closed": closed,
        "critical": critical
    }