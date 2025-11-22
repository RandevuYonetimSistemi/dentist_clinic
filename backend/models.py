from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Patient(Base):
    __tablename__ = "patients"
    
    #doldurulacak

class Doctor(Base):
    __tablename__ = "doctors"
    
    #doldurulacak


class Appointment(Base):
    __tablename__ = "appointments"
    
    #doldurulacak


class Service(Base):
    __tablename__ = "services"
    
    #doldurulacak
