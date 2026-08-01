# AI Customer Complaint Management System

An AI-powered Customer Complaint Management System developed using **React.js, FastAPI, PostgreSQL, LangChain, and Groq LLM** to automate pharmaceutical complaint handling. The system extracts complaint information from PDF documents, analyzes complaints using AI, classifies risk levels, generates CAPA recommendations, and provides a centralized dashboard for complaint management.

---

## Project Overview

Pharmaceutical companies receive numerous customer complaints regarding product quality, packaging, labeling, and manufacturing defects. Manual complaint processing is time-consuming and prone to inconsistencies.

This project leverages **Artificial Intelligence** to automate complaint analysis by extracting structured information from complaint documents and assisting Quality Assurance teams in making faster, more informed decisions.

---

# Features

- Upload Complaint PDF
- AI-powered Complaint Analysis
- Automatic Information Extraction
- Product & Batch Number Detection
- Complaint Summary Generation
- Risk Level Classification
- CAPA Recommendation Generation
- PostgreSQL Database Integration
- Dashboard Statistics
- Search Complaints
- Risk Level Filter
- Complaint Status Management
- Interactive Swagger API Documentation

---

# Tech Stack

## Frontend
- React.js
- Material UI (MUI)
- Axios

## Backend
- FastAPI
- SQLAlchemy
- Pydantic

## Database
- PostgreSQL

## Artificial Intelligence
- LangChain
- Groq LLM

## PDF Processing
- PyMuPDF (fitz)

---

# System Architecture

```text
Customer Complaint PDF
          │
          ▼
PDF Text Extraction (PyMuPDF)
          │
          ▼
FastAPI Backend
          │
          ▼
LangChain + Groq LLM
          │
 ┌────────┼────────┐
 ▼        ▼        ▼
Customer Product  Risk
Details  Details Classification
          │
          ▼
CAPA Recommendation
          │
          ▼
PostgreSQL Database
          │
          ▼
React Dashboard
```

---

# Project Structure

```
AI-Customer-Complaint-Management-System

│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── api
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── docs
├── demo
├── README.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/mohsiniqubal/AI-Customer-Complaint-Management-System.git

cd AI-Customer-Complaint-Management-System
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file

```env
DATABASE_URL=postgresql://username:password@localhost:5432/aivoa

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

---

# REST API

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /ai/extract | Analyze complaint using AI |
| POST | /pdf/upload | Upload and analyze complaint PDF |
| POST | /complaints | Save complaint |
| GET | /complaints | Get all complaints |
| GET | /complaints/search | Search complaints |
| PUT | /complaints/{id}/status | Update complaint status |
| GET | /dashboard/stats | Dashboard statistics |

---

# Dashboard Features

- Total Complaints
- Open Complaints
- Under Investigation
- Closed Complaints
- Critical Complaints
- Complaint Search
- Risk Filter
- Status Update

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### PDF Upload

![PDF Upload](screenshots/pdf-upload.png)

### AI Complaint Analysis

![AI Analysis](screenshots/ai-analysis.png)

### Complaint Dashboard

![Complaint Dashboard](screenshots/complaint-dashboard.png)
---

# Future Enhancements

- User Authentication
- Role-Based Access Control
- Email Notifications
- Complaint Assignment Workflow
- Audit Logs
- Report Export (PDF/Excel)
- Advanced Analytics Dashboard
- AI Chatbot Assistant

---

# Key Highlights

- AI-powered complaint analysis
- Automated information extraction
- Pharmaceutical Quality Management workflow
- Responsive Material UI interface
- RESTful API architecture
- PostgreSQL database integration
- Modular and scalable backend design

---

# Author

**Mohsin Iqubal**

MCA Graduate | AI & Data Science Enthusiast

GitHub: https://github.com/mohsiniqubal

LinkedIn: https://www.linkedin.com/in/mohsin-iqubal-805145129/

---

# License

This project is intended for educational, research, and portfolio purposes.