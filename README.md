# Mentorship Booking Platform

A full-stack mentorship booking platform that enables students to connect with mentors, browse mentor profiles, view available time slots, and book mentorship sessions. The project focuses on building a scalable backend using FastAPI while providing an intuitive user interface with React.


![Home](https://github.com/hitakshigabani21/Mentorship-Booking-Platform/blob/5f3613eec0e221e4039b96aa21d4a9d60e71b2dd/Mentorship_Booking_Platform/Screenshots/Homepage_hero.png)

---

## Features

- Student and Mentor Registration

  ![create account](https://github.com/hitakshigabani21/Mentorship-Booking-Platform/blob/9c77ad27b3ab4c24a0ab16697345bc48f3501af6/Mentorship_Booking_Platform/Screenshots/create%20account.png)

  
- User Authentication
- Browse and Search Mentors
- Mentor Profile Management
- Add, Update and Delete Availability Slots
  
  ![manage slots](https://github.com/hitakshigabani21/Mentorship-Booking-Platform/blob/afbaa041ca2e0c8d28817ef321f6aa769c80d97a/Mentorship_Booking_Platform/Screenshots/Manageslots.png)
  
- Book and Cancel Mentorship Sessions

![book slots](https://github.com/hitakshigabani21/Mentorship-Booking-Platform/blob/f2d5fef771b2dc923d7ce8e58911c0dae6286b05/Mentorship_Booking_Platform/Screenshots/bookslots.png)

- View Mentor Schedule
- RESTful API Architecture
- Structured Logging
- Centralized Exception Handling
- Database Retry Mechanism
- Input Validation
- MySQL Database Integration

---

## Tech Stack

### Frontend
- React.js
- Vite
- Ant Design
- JavaScript
- CSS

### Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic

### Database
- MySQL

### Tools
- Git
- GitHub

---

## Project Architecture

```
React Frontend
        │
REST APIs (FastAPI)
        │
Business Logic
        │
SQLAlchemy ORM
        │
MySQL Database
```

---

## Database Design

The application consists of the following entities:

- Students
- Mentors
- Expertise
- Mentor Availability Slots
- Bookings
- Reviews

The database is designed using a normalized schema to efficiently manage mentor availability and booking workflows.

---

## Backend Highlights

- Modular REST API architecture
- SQLAlchemy ORM for database operations
- Structured logging for request and error tracking
- Centralized exception handling
- Request validation using Pydantic
- Database retry mechanism for improved reliability
- Clean separation of API, business logic, and database layers

---

## Future Enhancements

- JWT Authentication
- Email Notifications
- WebSocket-based Live Slot Updates
- Admin Dashboard
- Session Feedback Analytics
- Deployment on Cloud

---

## Learning Outcomes

This project helped me gain practical experience in:

- Full-stack application development
- REST API design
- FastAPI framework
- SQLAlchemy ORM
- MySQL database design
- Backend architecture
- Exception handling and logging
- Frontend-backend integration

---

## Author

**Hitakshi Gabani**
