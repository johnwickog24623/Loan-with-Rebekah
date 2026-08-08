# Loans With Rebekah

An AI-powered mortgage brokerage platform featuring an interactive frontend, 24/7 AI Voice Assistant scheduling, Google Calendar & Gmail integration, and a FastAPI backend.

## Project Structure

- `frontend/`: Next.js 15 application with Tailwind CSS, GSAP, and AI voice booking widget.
- `backend/`: FastAPI backend with PostgreSQL database, Google Calendar integration, Vapi voice call hooks, and customer/appointment services.
- `Docs/`: Project architecture, database schemas, and workflow documentation.

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate # Windows PowerShell
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
