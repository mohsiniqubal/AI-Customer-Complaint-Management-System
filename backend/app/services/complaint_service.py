from sqlalchemy.orm import Session

from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate


def create_complaint(db: Session, complaint: ComplaintCreate):
    db_complaint = Complaint(
        customer_name=complaint.customer_name,
        email=complaint.email,
        product_name=complaint.product_name,
        batch_number=complaint.batch_number,
        complaint=complaint.complaint,
        complaint_summary=complaint.complaint_summary,
        risk_level=complaint.risk_level,
        recommendation=complaint.recommendation,
    )

    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)

    return db_complaint


def get_all_complaints(db: Session):
    return db.query(Complaint).all()


def update_complaint_status(
    db: Session,
    complaint_id: int,
    status: str,
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        return None

    complaint.status = status

    db.commit()
    db.refresh(complaint)

    return complaint