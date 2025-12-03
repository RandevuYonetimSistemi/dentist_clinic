export interface Doctor {
    id: number;
    first_name: string;
    last_name: string;
    specialization: string;
    email: string;
    phone: string;
}

export interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
}

export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    service_id: number;
    appointment_date: string;
    appointment_time: string;
    status: string;
    notes: string;
    doctor_name?: string;
    patient_name?: string;
    service_name?: string;
}

export interface AvailableSlot {
    date: string;
    time: string;
    available: boolean;
}
