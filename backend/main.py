from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, date, time, timedelta
from typing import List, Optional
from pydantic import BaseModel, EmailStr
import models
from database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(title="Diş Kliniği Randevu Sistemi API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Pydantic Schemas api veri giriş cikisleri
class AppointmentCreate(BaseModel):# Randevu oluşturma için giriş modeli
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



# API "endpoints"
@app.get("/")
def read_root():
    return {"message": "Diş Kliniği Randevu Sistemi API", "version": "1.0"}

# Doctor endpoints
@app.get("/api/doctors", response_model=List[DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(models.Doctor).all()
    return doctors

@app.get("/api/doctors/{doctor_id}", response_model=DoctorResponse)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doktor bulunamadı")
    return doctor

# Service endpoints
@app.get("/api/services", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).all()
    return services

# Appointment endpoints
@app.get("/api/appointments/available")
def get_available_slots(
    doctor_id: int,
    start_date: date,
    end_date: Optional[date] = None,
    db: Session = Depends(get_db)
):
    """Belirtilen tarih aralığında müsait randevu saatlerini döndürür"""
    if not end_date:
        end_date = start_date + timedelta(days=7)
    
    # Working hours: 09:00 - 18:00, 30 minute slots
    working_hours_start = time(9, 0)
    working_hours_end = time(18, 0)
    slot_duration = 30  # minutes
    
    available_slots = []
    current_date = start_date
    
    while current_date <= end_date:
        # Skip weekends
        if current_date.weekday() < 5:  # Monday = 0, Friday = 4
            # Get existing appointments for this date
            existing_appointments = db.query(models.Appointment).filter(
                models.Appointment.doctor_id == doctor_id,
                models.Appointment.appointment_date == current_date,
                models.Appointment.status != "cancelled"
            ).all()
            
            booked_times = {apt.appointment_time for apt in existing_appointments}
            
            # Generate time slots
            current_time = datetime.combine(current_date, working_hours_start)
            end_time = datetime.combine(current_date, working_hours_end)
            
            while current_time < end_time:
                slot_time = current_time.time()
                is_available = slot_time not in booked_times
                
                available_slots.append({
                    "date": current_date.isoformat(),
                    "time": slot_time.strftime("%H:%M"),
                    "available": is_available
                })
                
                current_time += timedelta(minutes=slot_duration)
        
        current_date += timedelta(days=1)
    
    return available_slots

@app.post("/api/appointments", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    # Check if patient exists by email, if not create new patient
    patient = db.query(models.Patient).filter(models.Patient.email == appointment.email).first()
    
    if not patient:
        # Create new patient
        patient = models.Patient(
            first_name=appointment.first_name,
            last_name=appointment.last_name,
            email=appointment.email,
            phone=appointment.phone
        )
        db.add(patient)
        db.commit()
        db.refresh(patient)
    
    # Check if doctor exists
    doctor = db.query(models.Doctor).filter(models.Doctor.id == appointment.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doktor bulunamadı")
    
    # Check if slot is available
    existing = db.query(models.Appointment).filter(
        models.Appointment.doctor_id == appointment.doctor_id,
        models.Appointment.appointment_date == appointment.appointment_date,
        models.Appointment.appointment_time == appointment.appointment_time,
        models.Appointment.status != "cancelled"
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Bu randevu saati dolu")
    
    # Create appointment
    new_appointment = models.Appointment(
        patient_id=patient.id,
        doctor_id=appointment.doctor_id,
        appointment_date=appointment.appointment_date,
        appointment_time=appointment.appointment_time,
        notes=appointment.notes
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    
    # Add doctor and patient names to response
    response = AppointmentResponse.from_orm(new_appointment)
    response.doctor_name = f"{doctor.first_name} {doctor.last_name}"
    response.patient_name = f"{patient.first_name} {patient.last_name}"
    
    return response

@app.get("/api/appointments/patient/{patient_id}", response_model=List[AppointmentResponse])
def get_patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).filter(
        models.Appointment.patient_id == patient_id
    ).order_by(models.Appointment.appointment_date.desc()).all()
    
    result = []
    for apt in appointments:
        doctor = db.query(models.Doctor).filter(models.Doctor.id == apt.doctor_id).first()
        patient = db.query(models.Patient).filter(models.Patient.id == apt.patient_id).first()
        
        apt_response = AppointmentResponse.from_orm(apt)
        apt_response.doctor_name = f"{doctor.first_name} {doctor.last_name}" if doctor else None
        apt_response.patient_name = f"{patient.first_name} {patient.last_name}" if patient else None
        result.append(apt_response)
    
    return result

@app.get("/api/appointments/email/{email}", response_model=List[AppointmentResponse])
def get_appointments_by_email(email: str, db: Session = Depends(get_db)):
    """Email adresine göre randevuları getir"""
    patient = db.query(models.Patient).filter(models.Patient.email == email).first()
    if not patient:
        return []
    
    return get_patient_appointments(patient.id, db)

@app.delete("/api/appointments/{appointment_id}")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Randevu bulunamadı")
    
    appointment.status = "cancelled"
    db.commit()
    
    return {"message": "Randevu iptal edildi"}

@app.get("/api/appointments/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Randevu bulunamadı")
    
    doctor = db.query(models.Doctor).filter(models.Doctor.id == appointment.doctor_id).first()
    patient = db.query(models.Patient).filter(models.Patient.id == appointment.patient_id).first()
    
    apt_response = AppointmentResponse.from_orm(appointment)
    apt_response.doctor_name = f"{doctor.first_name} {doctor.last_name}" if doctor else None
    apt_response.patient_name = f"{patient.first_name} {patient.last_name}" if patient else None
    
    return apt_response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
