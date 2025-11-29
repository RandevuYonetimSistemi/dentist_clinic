
-- Hastalarin Tablozu
CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doktorlarin Tablosu
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    specialization VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Randevular icin Tablo
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    CONSTRAINT unique_appointment UNIQUE (doctor_id, appointment_date, appointment_time)--Aynı doktorun aynı saatte 2 rendevusunu engeller
);

-- Hizmetler icin Tablo
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER DEFAULT 30,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Varsayılan Doktorlari Ekle
INSERT INTO doctors (first_name, last_name, specialization, email, phone) VALUES
('doktorad1', 'doktorsoyad1', 'Diş Hekimliği', 'doktor1@gmail.com', '+90 111 11 11'),
('doktorad2', 'doktorsoyad2', 'Diş Hekimliği2', 'doktor2@gmail.com', '+90 222 22 22');

-- Varsayılan Hizmetleri Ekle
INSERT INTO services (name, description, duration_minutes, price) VALUES
('Genel Kontrol', 'Rutin diş muayenesi ve kontrolü', 30, 500.00),
('Diş Temizliği', 'Profesyonel diş temizliği ve tartar temizliği', 45, 750.00),
('Dolgu', 'Çürük tedavisi ve dolgu işlemi', 60, 1200.00),
('Kanal Tedavisi', 'Kök kanal tedavisi', 90, 2500.00),
('Diş Çekimi', 'Basit diş çekimi', 30, 800.00),
('Beyazlatma', 'Profesyonel diş beyazlatma', 60, 2000.00),
('implant', 'Diş implant uygulamasi', 120, 8000.00);