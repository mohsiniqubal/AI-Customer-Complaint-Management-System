from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.db import get_db
from app.models.complaint import Complaint

from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintStatusUpdate,
)

from app.services.complaint_service import (
    create_complaint,
    get_all_complaints,
    update_complaint_status,
)

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)


# Create Complaint
@router.post("/")
def create_new_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    return create_complaint(db, complaint)


# Get All Complaints
@router.get("/")
def read_all_complaints(
    db: Session = Depends(get_db)
):
    return get_all_complaints(db)


# Search Complaints
@router.get("/search")
def search_complaints(
    q: str = "",
    risk: str = "",
    db: Session = Depends(get_db)
):
    query = db.query(Complaint)

    if q:
        query = query.filter(
            or_(
                Complaint.customer_name.ilike(f"%{q}%"),
                Complaint.product_name.ilike(f"%{q}%"),
                Complaint.batch_number.ilike(f"%{q}%")
            )
        )

    if risk and risk != "All":
        query = query.filter(
            Complaint.risk_level == risk
        )

    return query.all()


# Update Complaint Status
@router.put("/{complaint_id}/status")
def update_status(
    complaint_id: int,
    data: ComplaintStatusUpdate,
    db: Session = Depends(get_db)
):
    complaint = update_complaint_status(
        db,
        complaint_id,
        data.status
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return complaint