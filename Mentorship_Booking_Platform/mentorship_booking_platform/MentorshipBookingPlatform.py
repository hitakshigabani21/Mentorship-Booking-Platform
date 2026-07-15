from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from Logger import logger
import Crud
import uvicorn
from fastapi import WebSocket, WebSocketDisconnect
from connection_manager import manager

from Database import engine, Base, SessionLocal
import Models

from Schemas import (
    StudentRequest,
    MentorRequest,
    SlotRequest,
    BookingRequest,
    SlotUpdateRequest,
    LoginRequest
)

# Creating FastAPI instance
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

try:
    with engine.connect() as conn:
        logger.info("Database connected successfully on startup")
except Exception as e:
    logger.exception("Database connection failed on startup")
    raise e

# Database Connection
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Routes
class MentorshipBookingPlatform:
    #Step-2: create websocket endpoint, frontend hits this endpoint
    @app.websocket("/ws")
    @staticmethod
    async def websocket_endpoint(websocket: WebSocket):

        await manager.connect(websocket)

        try:
            while True:
                await websocket.receive_text()

        except WebSocketDisconnect:
            manager.disconnect(websocket)

#Index Route
    @app.get("/")
    @staticmethod
    def read_root():
        return {"message": "Welcome to the Mentorship Booking Platform!"}

    #add student
    @app.post("/addstudent", status_code=status.HTTP_201_CREATED)
    @staticmethod
    def register_student(student_data: StudentRequest, db: Session = Depends(get_db)):
        return Crud.register_student(student_data, db)

    #add mentor
    @app.post("/addmentor", status_code=status.HTTP_201_CREATED)
    @staticmethod
    def register_mentor(mentor_data: MentorRequest, db: Session = Depends(get_db)):
        return Crud.register_mentor(mentor_data, db)
    
    #loggin user
    @app.post("/login")
    @staticmethod
    def login_user(
        login_data: LoginRequest,
        db: Session = Depends(get_db)
    ):
        return Crud.login_user(
            login_data,
            db
        )
    
    #get all the mentors
    @app.get("/mentors", status_code=status.HTTP_200_OK)
    @staticmethod
    def get_all_mentors(db: Session = Depends(get_db)):
        return Crud.get_all_mentors(db)
    
    #get mentor by id
    @app.get("/mentors/{mentor_id}")
    @staticmethod
    def get_mentor_by_id(
        mentor_id: int,
        db: Session = Depends(get_db)
    ):
        return Crud.get_mentor_by_id(
            mentor_id,
            db
        )

    #add slot
    @app.post("/addslot", status_code=status.HTTP_201_CREATED)
    @staticmethod
    def add_slot(slot_data: SlotRequest,db: Session = Depends(get_db)):
        return Crud.add_slot(slot_data, db)
    
    #delete slot
    @app.delete("/slots/{slot_id}")
    def delete_slot_route(
        slot_id: int,
        db: Session = Depends(get_db)
    ):
        return Crud.delete_slot(
            slot_id,
            db
        )

    #create booking
    @app.post("/booksession", status_code=status.HTTP_201_CREATED)
    @staticmethod
    def book_session(booking_data: BookingRequest, db: Session = Depends(get_db)):
        return Crud.book_session(booking_data, db)

    #get schedule of a mentor
    @app.get("/mentors/{mentor_id}/schedule", status_code=status.HTTP_200_OK)
    @staticmethod
    def get_mentor_schedule(mentor_id: int, db: Session = Depends(get_db)):
        return Crud.get_mentor_schedule(mentor_id, db)

    #delete booking
    @app.put("/bookings/{booking_id}/cancel", status_code=status.HTTP_200_OK)
    @staticmethod
    def cancel_booking(booking_id: int, student_id: int, db: Session = Depends(get_db)):
        return Crud.cancel_booking(booking_id, student_id, db)

    #show all the slots of a mentor
    @app.get("/mentors/{mentor_id}/slots", status_code=status.HTTP_200_OK)
    @staticmethod
    def get_slots_by_mentor(mentor_id: int, db: Session = Depends(get_db)):
        return Crud.get_slots_by_mentor(mentor_id, db)

    #Update slot details
    @app.put("/slots/{slot_id}", status_code=status.HTTP_200_OK)
    @staticmethod
    def update_slot(slot_id: int, slot_data: SlotUpdateRequest, db: Session = Depends(get_db)):
        return Crud.update_slot(slot_id, slot_data, db)

    #Search mentors by name
    @app.get("/mentors/search", status_code=status.HTTP_200_OK)
    @staticmethod
    def search_mentor(name: str, db: Session = Depends(get_db)):
        return Crud.search_mentor(name, db)
    
    @app.get(
        "/students/{student_id}/bookings",
        status_code=status.HTTP_200_OK
    )
    @staticmethod
    def get_student_bookings(
        student_id: int,
        db: Session = Depends(get_db)
    ):
        return Crud.get_student_bookings(
            student_id,
            db
        )
    
#get student by id
    @app.get("/students/{student_id}")
    @staticmethod
    def get_student_by_id(
        student_id: int,
        db: Session = Depends(get_db)
    ):
        return Crud.get_student_by_id(
            student_id,
            db
        )
    
    @app.post("/test-notification")
    @staticmethod
    async def test_notification():

        manager.broadcast_sync({
            "event": "test"
        })

        return {
            "message": "sent"
        }




if __name__ == "__main__":
    uvicorn.run(
        "MentorshipBookingPlatform:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )

    
