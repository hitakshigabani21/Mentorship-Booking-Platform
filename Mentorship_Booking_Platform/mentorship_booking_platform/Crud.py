from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session
from connection_manager import manager
from datetime import datetime
from Logger import logger
from Helper import database_retry
import Helper
from fastapi import WebSocket, WebSocketDisconnect
from datetime import datetime, date

from Database import engine, Base, SessionLocal
import Models

from Schemas import (
    StudentRequest,
    MentorRequest,
    SlotRequest,
    BookingRequest,
    SlotUpdateRequest
)

# Simple Operations
#Add (Create) Student
@database_retry
def register_student(student_data: StudentRequest, db: Session):
    student = Models.Students(
        S_Name=student_data.S_Name,
        S_Email=student_data.S_Email,
        S_Phone=student_data.S_Phone,
        S_College=student_data.S_College,
        S_Branch=student_data.S_Branch,
        S_Year=student_data.S_Year,
        S_Password=student_data.S_Password
    )

    try:
        db.add(student)
        db.commit()
        db.refresh(student)

    except OperationalError:
        db.rollback()
        logger.warning(
            "Database connection issue while registering student. Retrying..."
        )

        raise
    except Exception as e:
        db.rollback()
        
        logger.exception(
            f"Error occurred while registering student"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while registering student"
        )
    
    logger.info(
        f"Student Registered Successfully. Student ID: {student.S_Id}"
    )

    return {
        "message": "Student Registered Successfully",
        "Student_Id": student.S_Id
    }



#Adding mentor(Create)
@database_retry
def register_mentor(mentor_data: MentorRequest,db: Session):
    mentor = Models.Mentors(
        M_Name=mentor_data.M_Name,
        M_Email=mentor_data.M_Email,
        M_Phone=mentor_data.M_Phone,
        M_Expertise_Id=mentor_data.M_Expertise_Id,
        M_ExperienceYears=mentor_data.M_ExperienceYears,
        M_Bio=mentor_data.M_Bio,
        M_Language=mentor_data.M_Language,
        M_Password=mentor_data.M_Password
    )

    try:
        db.add(mentor)
        db.commit()
        db.refresh(mentor)

    except OperationalError:
        db.rollback()

        logger.warning(
            "Database connection issue while registering mentor. Retrying..."
        )

        raise

    except Exception as e:
        db.rollback()
        logger.exception(
            f"Error occurred while registering mentor"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while registering mentor"
        )
    
    logger.info(
        f"Mentor Registered Successfully. Mentor ID: {mentor.M_Id}"
    )

    return {
        "message": "Mentor Registered Successfully",
        "Mentor_Id": mentor.M_Id
    }

#Show All the mentors
def get_all_mentors(db: Session):

    try:
        mentors = db.query(Models.Mentors).all()

        if not mentors:
            logger.info("No mentors found")
            return []

        result = []

        for m in mentors:
            result.append({
                "M_Id": m.M_Id,
                "M_Name": m.M_Name,
                "M_Email": m.M_Email,
                "M_Phone": m.M_Phone,
                "M_ExperienceYears": m.M_ExperienceYears,
                "M_Bio": m.M_Bio,
                "M_Language": m.M_Language,
                "M_Rating": float(m.M_Rating) if m.M_Rating else 0,
                "M_Expertise": {
                    "Id": m.expertise.E_Id,
                    "Name": m.expertise.E_Name,
                    "Image": m.expertise.E_Image
                }
            })

        logger.info("Fetched all mentors with expertise successfully")

    except Exception as e:
        logger.exception("Error fetching mentors")
        raise HTTPException(
            status_code=500,
            detail="Error fetching mentors"
        )
    return result
    

#Get the mentor by id 
def get_mentor_by_id(mentor_id: int, db: Session):

    mentor = Helper.get_mentor(db, mentor_id)

    if mentor is None:
        raise HTTPException(
            status_code=404,
            detail="Mentor Not Found"
        )

    return {
        "M_Id": mentor.M_Id,
        "M_Name": mentor.M_Name,
        "M_Email": mentor.M_Email,
        "M_Phone": mentor.M_Phone,
        "M_ExperienceYears": mentor.M_ExperienceYears,
        "M_Bio": mentor.M_Bio,
        "M_Language": mentor.M_Language,
        "M_Rating": float(mentor.M_Rating)
        if mentor.M_Rating else 0,

        "M_Expertise": {
            "Id": mentor.expertise.E_Id,
            "Name": mentor.expertise.E_Name,
            "Image": mentor.expertise.E_Image
        }
    }

#Adding Slot(Create)
@database_retry
def add_slot(slot_data: SlotRequest, db: Session):
    #Check if the mentor exists
    mentor = Helper.get_mentor(db, slot_data.M_Id)

    if mentor is None:
        logger.error(
            f"Mentor Not Found. Mentor ID: {slot_data.M_Id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Mentor Not Found"
        )
    #check if the slot added is valid or not by date and time 

    if slot_data.Sl_Date < date.today():
        logger.error(
            f"Cannot create slot in past. Date: {slot_data.Sl_Date}"
        )

        raise HTTPException(
            status_code=400,
            detail="Cannot create slots for past dates"
        )
    
    if slot_data.Sl_Date == date.today:
        current_time = datetime.now().time()

        if slot_data.Sl_StartTime <= current_time:
            logger.error(f"Cannot create slot in past. Invalid Time")
            raise HTTPException(
                status_code=400,
                detail="Slot start time must be in the future"
            )
    
    #check if the slot time is valid
    if slot_data.Sl_StartTime >= slot_data.Sl_EndTime:
        logger.error(
            f"Invalid slot timing. Start Time: {slot_data.Sl_StartTime}, End Time: {slot_data.Sl_EndTime}"
        )
        raise HTTPException(
            status_code=400,
            detail="End time must be after start time"
        )
    #check if no slots with the same time exists & no slot on the same day can have overlapping time
    existing_slots = db.query(Models.Slots).filter(
        Models.Slots.M_Id == slot_data.M_Id,
        Models.Slots.Sl_Date == slot_data.Sl_Date,
    ).order_by(Models.Slots.Sl_Id.desc()).all()

    for existing_slot in existing_slots:
        if (
            slot_data.Sl_StartTime < existing_slot.Sl_EndTime and
            slot_data.Sl_EndTime > existing_slot.Sl_StartTime
        ):
            logger.error(
                f"Slot overlap detected. Updating Slot ID: {slot_data.M_Id}, "
                f"Conflicting Slot ID: {existing_slot.Sl_Id}"
            )
            raise HTTPException(
                status_code=409,
                detail="Slot overlaps with an existing slot"
            )
        
    #Adding the slot 
    slot = Models.Slots(
        M_Id=slot_data.M_Id,
        Sl_Date=slot_data.Sl_Date,
        Sl_StartTime=slot_data.Sl_StartTime,
        Sl_EndTime=slot_data.Sl_EndTime,
        Sl_Status="Available"
    )
    try:
        db.add(slot)
        db.commit()
        db.refresh(slot)
    
    except OperationalError:
        db.rollback()
        logger.warning(
        "Database connection issue while adding slot. Retrying..."
        )

        raise 

    except Exception as e:
        db.rollback()
        logger.exception(
            f"Error occurred while adding slot"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while adding slot"
        )
    print("Sending websocket notification")
    #Step-4: add_slot ke baad broadcast karo message similarly baaki operations me unke baad broadcast karo message.
    manager.broadcast_sync({
        "event": "slot_created",
        "mentor_id": slot.M_Id,
        "slot_id": slot.Sl_Id
    })
    
    logger.info(
        f"Slot Added Successfully. Slot ID: {slot.Sl_Id}"
    )

    return {
        "message": "Slot Added Successfully",
        "Slot_Id": slot.Sl_Id
    }

#Book a session - Create
@database_retry
def book_session(booking_data: BookingRequest, db: Session):
    #Check if the student exists
    student = Helper.get_student(db, booking_data.S_Id)
    if student is None:
        logger.error(
            f"Student Not Found. Student ID: {booking_data.S_Id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    #Check if the slot exists
    slot = Helper.get_slot(db, booking_data.Sl_Id)
    if slot is None:
        logger.error(
            f"Slot Not Found. Slot ID: {booking_data.Sl_Id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Slot Not Found"
        )

    #Check if the slot is available or not
    if not Helper.is_slot_available(slot):
        logger.error(
            f"Slot Already Booked. Slot ID: {booking_data.Sl_Id}"
        )
        raise HTTPException(
            status_code=409,
            detail="Slot Already Booked"
        )

    #If the Student exists and the slot is available create a booking
    booking = Models.Bookings(
        S_Id=booking_data.S_Id,
        Sl_Id=booking_data.Sl_Id,
        B_Topic=booking_data.B_Topic,
        B_Status="Confirmed",
        B_BookedAt=datetime.now()
    )

    try:
        db.add(booking)
        #If the Session is booked successfully, update the slot status to "Booked"
        slot.Sl_Status = "Booked"
        db.commit()
        db.refresh(booking)
    except OperationalError:

        db.rollback()

        logger.warning(
            "Database connection issue while booking session. Retrying..."
        )

        raise
    except Exception as e:
        db.rollback()
        logger.exception(
            f"Error occurred while booking session"  
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while booking session"
        )
    
    manager.broadcast_sync({
        "event": "booking_created",
        "mentor_id": slot.M_Id,
        "booking_id": booking.B_Id
    })
    
    logger.info(
        f"Booking Successful. Booking ID: {booking.B_Id}"
    )

    return {
        "message": "Booking Successful",
        "Booking_Id": booking.B_Id
    }

#Show the slots of a mentor - Read
def get_slots_by_mentor(mentor_id: int, db: Session):
        
    try:
        #Get all the slots of a mentor by their id
        slots = db.query(Models.Slots).filter(
            Models.Slots.M_Id == mentor_id
        ).order_by(Models.Slots.Sl_Id.desc()).all()

        #If there are no slots for the mentor, return a message
        if not slots:
            logger.info(
                f"No slots found for Mentor ID: {mentor_id}"
            )
            return []

        result = []

        for s in slots:
            booking = Helper.get_booking_by_slot(db, s.Sl_Id)
            student = None
            if booking:
                student = Helper.get_student(db, booking.S_Id)
            result.append(
                {
                    "Sl_Id": s.Sl_Id,
                    "Sl_Date": s.Sl_Date,
                    "Sl_StartTime": s.Sl_StartTime,
                    "Sl_EndTime": s.Sl_EndTime,
                    "Sl_Status": s.Sl_Status,

                    "Booked_By": (
                        booking.S_Id
                        if booking
                        else None
                    ),

                    "Booking_Id": (
                        booking.B_Id
                        if booking
                        else None
                    ),

                    "Student_Name": (
                        student.S_Name
                        if student
                        else None
                    ),

                    "Topic": (
                        booking.B_Topic
                        if booking
                        else None
                    )
                }
            )
        
        logger.info(
            f"Retrieved slots successfully for Mentor ID: {mentor_id}"
        )

        return result

    except Exception as e:

        logger.exception(
            f"Error occurred while retrieving slots for Mentor ID: {mentor_id}"
        )

        raise HTTPException(
            status_code=500,
            detail="Error occurred while retrieving slots"
        )

        


#Get the schedule of a mentor - only show the slots when the mentor is busy
def get_mentor_schedule(mentor_id,db: Session):
    #Check if the mentor exists
    mentor = Helper.get_mentor(db, mentor_id)

    if mentor is None:
        logger.error(
            f"Mentor Not Found. Mentor ID: {mentor_id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Mentor Not Found"
        )

    #Return the Slots of the mentor which have the status "booked" and in ascending order of date and time
    slots = db.query(Models.Slots).filter(
        Models.Slots.M_Id == mentor_id,
        Models.Slots.Sl_Status == "Booked"
    ).order_by(
        Models.Slots.Sl_Date,
        Models.Slots.Sl_StartTime
    ).all()

    schedule = []

    for slot in slots:

        schedule.append(
            {
                "Slot_Id": slot.Sl_Id,
                "Date": slot.Sl_Date,
                "Start_Time": slot.Sl_StartTime,
                "End_Time": slot.Sl_EndTime,
                "Status": slot.Sl_Status,
            }
        )
    
    logger.info(
        f"Schedule retrieved for Mentor ID: {mentor_id}"
    )

    return schedule

#Cancel Booking- delete 
@database_retry
def cancel_booking(booking_id, student_id, db: Session):

    #Check if the booking exists or not
    booking = Helper.get_booking(db, booking_id)
    if booking is None:
        logger.error(
            f"Booking Not Found. Booking ID: {booking_id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Booking Not Found"
        )
    
    if booking.S_Id != student_id:
        logger.error(
            f"Unauthorized cancellation attempt. Booking ID: {booking_id}"
        )

        raise HTTPException(
            status_code=403,
            detail="You cannot cancel this booking"
        )

    #Get the slot associated with the booking and update its status to "Available"
    slot = db.query(Models.Slots).filter(
        Models.Slots.Sl_Id == booking.Sl_Id
    ).first()

    if slot:
        slot.Sl_Status = "Available"

    #Delete booking from DB
    try:
        db.delete(booking)
        db.commit()
    except OperationalError:

        db.rollback()

        logger.warning(
            "Database connection issue while cancelling session. Retrying..."
        )

        raise
    except Exception as e:
        db.rollback()
        logger.exception(
            f"Error occurred while cancelling booking"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while cancelling booking"
        )
    
    manager.broadcast_sync({
        "event": "booking_cancelled",
        "mentor_id": slot.M_Id,
        "booking_id": booking_id
    })

    logger.info(
        f"Booking Cancelled. Booking ID: {booking.B_Id}"
    )

    return {
        "message": "Booking Cancelled Successfully"
    }

#Update Slot details 
@database_retry
def update_slot(slot_id: int, slot_data: SlotUpdateRequest, db: Session):

    #Check if the slot exists
    slot = Helper.get_slot(db, slot_id)
    if slot is None:
        logger.error(
            f"Slot Not Found. Slot ID: {slot_id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Slot Not Found"
        )
    # Check if slot is already booked
    if slot.Sl_Status == "Booked":
        logger.error(
            f"Attempt to update booked slot. Slot ID: {slot_id}"
        )
        raise HTTPException(
            status_code=400,
            detail="Booked slots cannot be updated"
        )
    
    #Check if the slot time is invalid
    if slot_data.Sl_StartTime >= slot_data.Sl_EndTime:
        logger.error(
            f"Invalid slot timing. Start Time: {slot_data.Sl_StartTime}, End Time: {slot_data.Sl_EndTime}"
        )
        raise HTTPException(
            status_code=400,
            detail="End time must be after start time"
        )
    
    #Check if the slot is valid by date and time(past date , past time)
    if slot_data.Sl_Date < date.today():
        logger.error(
            f"Cannot create slot in past. Date: {slot_data.Sl_Date}"
        )

        raise HTTPException(
            status_code=400,
            detail="Cannot update: Invalid Slot Date"
        )
    
    if slot_data.Sl_Date == date.today:
        current_time = datetime.now().time()

        if slot_data.Sl_StartTime <= current_time:
            logger.error(f"Cannot update the slot: Invalid time")
            raise HTTPException(
                status_code=400,
                detail="Slot start time must be in the future"
            )

    #Check if the slots are overlapping or not
    existing_slots = db.query(Models.Slots).filter(
        Models.Slots.M_Id == slot.M_Id,
        Models.Slots.Sl_Date == slot_data.Sl_Date,
        Models.Slots.Sl_Id != slot_id
    ).all()

    for existing_slot in existing_slots:
        if (
            slot_data.Sl_StartTime < existing_slot.Sl_EndTime and
            slot_data.Sl_EndTime > existing_slot.Sl_StartTime
        ):
            logger.error(
                f"Slot overlap detected. Updating Slot ID: {slot_id}, "
                f"Conflicting Slot ID: {existing_slot.Sl_Id}"
            )
            raise HTTPException(
                status_code=409,
                detail="Slot overlaps with an existing slot"
            )

    # update slot details by the provided data
    #Mentor ID is not updated as it is assumed that the slot belongs to the same mentor
    slot.Sl_Date = slot_data.Sl_Date
    slot.Sl_StartTime = slot_data.Sl_StartTime
    slot.Sl_EndTime = slot_data.Sl_EndTime

    try:
        db.commit()
        db.refresh(slot)
    except OperationalError:

        db.rollback()

        logger.warning(
            "Database connection issue while updating slot details. Retrying..."
        )

        raise
    except Exception as e:
        db.rollback()
        logger.exception(
            f"Error occurred while updating slot"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while updating slot"
        )
    
    manager.broadcast_sync({
        "event": "slot_updated",
        "mentor_id": slot.M_Id,
        "slot_id": slot.Sl_Id
    })

    logger.info(
        f"Slot Updated Successfully. Slot ID: {slot.Sl_Id}"
    )

    return {
        "message": "Slot Updated Successfully",
        "Slot_Id": slot.Sl_Id
    }

#Delete the Slot
@database_retry
def delete_slot(slot_id: int, db:Session):
    #check if the slot is existing or not
    slot = Helper.get_slot(db, slot_id)
    if slot is None:
        logger.error(
            f"Slot Not Found. Slot ID: {slot_id}"
        )
        raise HTTPException(
            status_code=404,
            detail="Slot Not Found"
        )
    
    #Check if the slot is booked or not
    if slot.Sl_Status == "Booked":
        logger.error(
            f"Attempt to delete booked slot. Slot ID: {slot_id}"
        )
        raise HTTPException(
            status_code=400,
            detail="Booked slots cannot be deleted"
        )
    
    #Check if the Slot date has already passed

    if slot.Sl_Date < date.today():
        logger.error(
            f"Attempt to delete expired slot. Slot ID: {slot_id}"
        )
        raise HTTPException(
            status_code=400,
            detail="Past slots cannot be deleted"
        )
    try:
        db.delete(slot)
        db.commit()
    except OperationalError:

        db.rollback()

        logger.warning(
            "Database connection issue while deleting slot. Retrying..."
        )

        raise
    except Exception:
        db.rollback()

        logger.exception(
            "Error occurred while deleting slot"
        )

        raise HTTPException(
            status_code=500,
            detail="Error occurred while deleting slot"
        )
    
    manager.broadcast_sync({
        "event": "slot_deleted",
        "mentor_id": slot.M_Id,
        "slot_id": slot_id
    })

    logger.info(
        f"Slot Deleted Successfully. Slot ID: {slot_id}"
    )

    return {
        "message": "Slot Deleted Successfully"
    }

# Filter Mentors by name
def search_mentor(name: str, db: Session):
    try:
        #get all the mentors by the given name using the helper function
        mentors = Helper.search_mentors_by_name(db, name)
        if not mentors:
            logger.info(
                f"No mentors found with name: {name}"
            )
            return{
                "message": "No mentors found with this name"
            }

        logger.info(
            f"Mentor search successful for name: {name}"
        )

        return [
            {
                "Mentor_Id": m.M_Id,
                "Name": m.M_Name,
                "Email": m.M_Email,
                "Expertise": m.M_Expertise,
                "Experience": m.M_ExperienceYears,
                "Language": m.M_Language,
                "Bio": m.M_Bio,
                "Rating": m.M_Rating
            }
            for m in mentors
        ]
    
    except HTTPException:
        raise

    except Exception as e:
        logger.exception(
            f"Error occurred while searching mentors"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error occurred while searching mentors"
        )

def login_user(login_data, db: Session):

    try:

        if login_data.role == "student":

            student = Helper.get_student_by_email(
                db,
                login_data.email
            )

            if student is None:

                logger.error(
                    f"Student not found. Email: {login_data.email}"
                )

                raise HTTPException(
                    status_code=404,
                    detail="Student not found"
                )

            if student.S_Password != login_data.password:

                logger.error(
                    f"Invalid password attempt for Student: {login_data.email}"
                )

                raise HTTPException(
                    status_code=401,
                    detail="Invalid password"
                )

            logger.info(
                f"Student login successful. Student ID: {student.S_Id}"
            )

            return {
                "message": "Login Successful",
                "role": "student",
                "user_id": student.S_Id,
            }

        elif login_data.role == "mentor":

            mentor = Helper.get_mentor_by_email(
                db,
                login_data.email
            )

            if mentor is None:

                logger.error(
                    f"Mentor not found. Email: {login_data.email}"
                )

                raise HTTPException(
                    status_code=404,
                    detail="Mentor not found"
                )

            if mentor.M_Password != login_data.password:

                logger.error(
                    f"Invalid password attempt for Mentor: {login_data.email}"
                )

                raise HTTPException(
                    status_code=401,
                    detail="Invalid password"
                )

            logger.info(
                f"Mentor login successful. Mentor ID: {mentor.M_Id}"
            )

            return {
                "message": "Login Successful",
                "role": "mentor",
                "user_id": mentor.M_Id
            }

        logger.error(
            f"Invalid role provided: {login_data.role}"
        )

        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    except HTTPException:
        raise

    except Exception:

        logger.exception(
            "Error occurred during login"
        )

        raise HTTPException(
            status_code=500,
            detail="Error occurred during login"
        )

#get the students bookings
def get_student_bookings(
    student_id: int,
    db: Session
):
    
    bookings = (
        db.query(
            Models.Bookings,
            Models.Slots,
            Models.Mentors,
            Models.Expertise
        )
        .join(
            Models.Slots,
            Models.Bookings.Sl_Id == Models.Slots.Sl_Id
        )
        .join(
            Models.Mentors,
            Models.Slots.M_Id == Models.Mentors.M_Id
        )
        .join(
            Models.Expertise,
            Models.Mentors.M_Expertise_Id == Models.Expertise.E_Id
        )
        .filter(
            Models.Bookings.S_Id == student_id
        ).order_by(
            Models.Bookings.B_BookedAt.desc()
        )
        .all()
    )

    result = []

    for booking, slot, mentor, expertise in bookings:

        result.append({
            "booking_id": booking.B_Id,
            "topic": booking.B_Topic,
            "booking_status": booking.B_Status,

            "mentor_id": mentor.M_Id,
            "mentor_name": mentor.M_Name,

            "expertise": expertise.E_Name,

            "session_date": slot.Sl_Date,
            "start_time": slot.Sl_StartTime,
            "end_time": slot.Sl_EndTime,

            "booked_at": booking.B_BookedAt
        })

    return result

def get_student_by_id(
    student_id: int,
    db: Session
):

    student = db.query(
        Models.Students
    ).filter(
        Models.Students.S_Id == student_id
    ).first()

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "S_Id": student.S_Id,
        "S_Name": student.S_Name,
        "S_Email": student.S_Email,
        "S_Phone": student.S_Phone,
        "S_College": student.S_College,
        "S_Branch": student.S_Branch,
        "S_Year": student.S_Year
    }

