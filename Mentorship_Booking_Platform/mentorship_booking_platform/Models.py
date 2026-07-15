#Models = Database tables

from sqlalchemy import (
    Column, Integer, String, Text, Date, Time,
    DateTime, DECIMAL, ForeignKey
)
from datetime import datetime
from Database import Base
from sqlalchemy.orm import relationship

class Students(Base):
    __tablename__ = "Students"

    S_Id = Column(Integer, primary_key=True, autoincrement=True)
    S_Name = Column(String(100), nullable=False)
    S_Email = Column(String(100), unique=True, nullable=False)
    S_Phone = Column(String(15), unique=True, nullable=False)
    S_College = Column(String(100), nullable=False)
    S_Branch = Column(String(50), nullable=False)
    S_Year = Column(Integer, nullable=False)
    S_Password = Column(String(255), nullable=False)

class Mentors(Base):

    __tablename__ = "Mentors"

    M_Id = Column(Integer, primary_key=True, autoincrement=True)

    M_Name = Column(String(100), nullable=False)
    M_Email = Column(String(100), unique=True, nullable=False)
    M_Phone = Column(String(15), unique=True, nullable=False)

    M_Expertise_Id = Column(
        Integer,
        ForeignKey("Expertise.E_Id"),
        nullable=False
    )
    M_ExperienceYears = Column(Integer, nullable=False)
    M_Bio = Column(Text, nullable=False)
    M_Language = Column(String(50), nullable=False)
    M_Rating = Column(DECIMAL(3, 2), default=0)
    M_Password = Column(String(255), nullable=False)
    expertise = relationship("Expertise", backref="mentors")

class Expertise(Base):
    __tablename__ = "Expertise"

    E_Id = Column(Integer, primary_key=True, autoincrement=True)
    E_Name = Column(String(100), unique=True, nullable=False)
    E_Image = Column(String(255), nullable=False)

class Slots(Base):
    __tablename__ = "Slots"

    Sl_Id = Column(Integer, primary_key=True, autoincrement=True)

    M_Id = Column(Integer, ForeignKey("Mentors.M_Id"), nullable=False)

    Sl_Date = Column(Date, nullable=False)
    Sl_StartTime = Column(Time, nullable=False)
    Sl_EndTime = Column(Time, nullable=False)

    Sl_Status = Column(String(20), default="Available")

class Bookings(Base):

    __tablename__ = "Bookings"

    B_Id = Column(Integer, primary_key=True, autoincrement=True)

    S_Id = Column(
        Integer,
        ForeignKey("Students.S_Id"),
        nullable=False
    )

    Sl_Id = Column(
        Integer,
        ForeignKey("Slots.Sl_Id"),
        nullable=False
    )

    B_Topic = Column(String(100), nullable=False)

    B_Status = Column(
        String(20),
        default="Confirmed"
    )

    B_BookedAt = Column(DateTime)


class Reviews(Base):

    __tablename__ = "Reviews"

    R_Id = Column(Integer, primary_key=True, autoincrement=True)

    B_Id = Column(
        Integer,
        ForeignKey("Bookings.B_Id"),
        nullable=False
    )

    R_Rating = Column(Integer, nullable=False)

    R_Comment = Column(Text)

    R_CreatedAt = Column(DateTime)


