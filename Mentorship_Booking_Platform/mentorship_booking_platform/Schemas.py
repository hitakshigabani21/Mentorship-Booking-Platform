from pydantic import BaseModel
from datetime import date, time, datetime

#Validates requests and responses 
# Request Schemas

class StudentRequest(BaseModel):
    S_Name: str
    S_Email: str
    S_Phone: str
    S_College: str
    S_Branch: str
    S_Year: int
    S_Password: str


class MentorRequest(BaseModel):
    M_Name: str
    M_Email: str
    M_Phone: str
    M_Expertise_Id: int  
    M_ExperienceYears: int
    M_Bio: str
    M_Language: str
    M_Password: str


class SlotRequest(BaseModel):
    M_Id: int
    Sl_Date: date
    Sl_StartTime: time
    Sl_EndTime: time


class BookingRequest(BaseModel):
    S_Id: int
    Sl_Id: int
    B_Topic: str

class SlotUpdateRequest(BaseModel):
    Sl_Date: date
    Sl_StartTime: time
    Sl_EndTime: time

class MentorUpdateRequest(BaseModel):
    M_Name: str | None = None
    M_Email: str | None = None
    M_Phone: str | None = None
    M_Bio: str | None = None
    M_Language: str | None = None
    M_ExperienceYears: int | None = None
    M_Expertise_Id: int | None = None

class LoginRequest(BaseModel):
    role: str
    email: str
    password: str

