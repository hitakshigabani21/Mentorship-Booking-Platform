# Mentorship Booking Platform (FastAPI + MySQL)

A backend system for booking mentorship sessions between students and mentors using time slots.

## Tech Stack
- FastAPI
- SQLAlchemy
- MySQL
- Pydantic
- Uvicorn

## Features

### Students
- Register student
- Search mentors by name
- Book a session
- Cancel booking

### Mentors
- Register mentor
- Add available slots
- View slots and schedule

### Booking System
- Book available slots
- Prevent double booking
- Auto-update slot status
- Cancel booking and free slot

## Project Structure
MENTORSHIP_BOOKING_PLATFORM/
├── mentorship_booking_platform/
│   ├── data/
│   │   └── config.ini
│   │
│   ├── configuration.py
│   ├── database.py
│   ├── helper.py
│   ├── models.py
│   ├── schemas.py
│   └── MentorshipBookingPlatform.py
│
├── setup.py
└── README.md

## Install Dependencies
```bash
pip install fastapi uvicorn sqlalchemy pymysql

```

## Run the Server
```bash
uvicorn mentorship_booking_platform.       MentorshipBookingPlatform:app --reload

```

## Purpose
This project demonstrates backend development using FastAPI with proper database design, CRUD operations, and real-world booking logic.