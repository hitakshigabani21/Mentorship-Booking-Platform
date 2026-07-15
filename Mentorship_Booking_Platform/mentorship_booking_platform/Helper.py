from Models import Students, Mentors, Slots, Bookings
from retry import retry
from sqlalchemy.exc import OperationalError, DisconnectionError
from Configuration import (
    retry_tries,
    retry_delay,
    retry_backoff
)

database_retry = retry(
    (OperationalError,DisconnectionError),
    tries=retry_tries,
    delay=retry_delay,
    backoff=retry_backoff
)

#get student by email
def get_student_by_email(db, email):
    return db.query(Students).filter(
        Students.S_Email == email
    ).first()

#get mentor by email
def get_mentor_by_email(db, email):
    return db.query(Mentors).filter(
        Mentors.M_Email == email
    ).first()

#Get a student by its ID
def get_student(db, student_id):
    return db.query(Students).filter(
        Students.S_Id == student_id
    ).first()

# Get All the Mentors
def get_all_mentors(db):
    return db.query(Mentors).all()

#Get a mentor by its ID
def get_mentor(db, mentor_id):
    return db.query(Mentors).filter(
        Mentors.M_Id == mentor_id
    ).first()

#Get a slot by its ID
def get_slot(db, slot_id):
    return db.query(Slots).filter(
        Slots.Sl_Id == slot_id
    ).first()

#Get a booking by its ID
def get_booking(db, booking_id):
    return db.query(Bookings).filter(
        Bookings.B_Id == booking_id
    ).first()

#Get booking by slot
def get_booking_by_slot(db, slot_id):
    return db.query(Bookings).filter(
        Bookings.Sl_Id == slot_id
    ).first()

#Check the availability of a slot
def is_slot_available(slot):
    if slot is None:
        return False
    return slot.Sl_Status == "Available"

#Search or filter mentors by name
def search_mentors_by_name(db, name: str):
    return db.query(Mentors).filter(
        Mentors.M_Name.like(f"%{name}%")
    ).all()