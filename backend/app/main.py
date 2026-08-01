from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine
from app.models.complaint import Complaint

from app.api.complaints import router as complaint_router
from app.api.ai import router as ai_router
from app.api.pdf import router as pdf_router
from app.api.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AIVOA AI Complaint Management System",
    version="1.0.0"
)

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(complaint_router)
app.include_router(ai_router)
app.include_router(pdf_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to AIVOA AI Complaint Management System 🚀"
    }