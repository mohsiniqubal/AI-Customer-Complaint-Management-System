from fastapi import APIRouter, UploadFile, File
import os
import shutil
import traceback

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

    try:

        # Save uploaded PDF
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text from PDF
        complaint_text = extract_text_from_pdf(file_path)

        print("\n========== EXTRACTED TEXT ==========")
        print(complaint_text[:500])
        print("====================================\n")

        # AI Analysis
        ai_result = extract_complaint(complaint_text)

        print("\n========== AI RESULT ==========")
        print(ai_result)
        print("===============================\n")

        # Reject non-pharmaceutical documents
        if ai_result.get("valid_complaint") is False:
            return {
                "error": True,
                "message": ai_result.get(
                    "message",
                    "This document is not a pharmaceutical customer complaint."
                )
            }

        # Success
        return {
            "error": False,
            "extracted_text": complaint_text,
            "ai_result": ai_result
        }

    except Exception as e:

        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        return {
            "error": True,
            "message": str(e)
        }