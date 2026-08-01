from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.utils.pdf_reader import extract_text_from_pdf
from app.ai.extractor import extract_complaint

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    complaint_text = extract_text_from_pdf(file_path)

    # AI Analysis
    ai_result = extract_complaint(complaint_text)

    return {
        "extracted_text": complaint_text,
        "ai_result": ai_result
    }