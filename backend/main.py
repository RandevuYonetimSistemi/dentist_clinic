from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, date, time, timedelta
from typing import List, Optional
from pydantic import BaseModel, EmailStr
import models
from database import engine, get_db

# tablo olustura
models.Base.metadata.create_all(bind=engine)

# FastAPI başlatma
app = FastAPI(title="Diş Kliniği Randevu Sistemi API")

# CORSSLAR
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Pydantic Schemas api veri giriş cikisleri
class AppointmentCreate(BaseModel):# Randevu oluşturma için giriş yeri
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    doctor_id: int
    appointment_date: date
    appointment_time: time
    notes: Optional[str] = None

class AppointmentResponse(BaseModel):# Randevu yanıt modeli kullanıcının gordugu
    id: int
    patient_id: int
    doctor_id: int
    appointment_date: date
    appointment_time: time
    status: str
    notes: Optional[str]
    doctor_name: Optional[str] = None
    patient_name: Optional[str] = None
    
    class Config:
        from_attributes = True

class DoctorResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    specialization: Optional[str]
    email: str
    phone: Optional[str]
    
    class Config:
        from_attributes = True

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    duration_minutes: int
    price: Optional[float]
    
    class Config:
        from_attributes = True

class AvailableSlot(BaseModel):
    date: date
    time: time
    available: bool
