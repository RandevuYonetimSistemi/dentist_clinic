# 🦷 Diş Kliniği Randevu Yönetim Sistemi

Modern ve kullanıcı dostu bir diş kliniği randevu yönetim sistemi. Hastalar kolayca randevu oluşturabilir, doktorlar ve hizmetler görüntüleyebilir, admin panelinden tüm işlemler yönetilebilir.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Endpoints](#-api-endpoints)
- [Veritabanı Şeması](#-veritabanı-şeması)
- [Admin Paneli](#-admin-paneli)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

### Hasta İşlemleri
- ✅ Online randevu oluşturma
- ✅ Doktor seçimi
- ✅ Hizmet seçimi (Genel Kontrol, Diş Temizliği, Dolgu, Kanal Tedavisi, vb.)
- ✅ Randevu geçmişini görüntüleme
- ✅ E-posta ile randevu takibi

### Admin Paneli
- 🔐 Güvenli giriş sistemi (JWT Token)
- 👨‍⚕️ Doktor yönetimi (Ekleme, Düzenleme, Silme)
- 🏥 Hizmet yönetimi (Ekleme, Düzenleme, Silme)
- 📅 Randevu yönetimi (Görüntüleme, Onaylama, Reddetme, Silme)
- 📊 Randevu durumu takibi (Pending, Confirmed, Cancelled)
- ✅ Bekleyen randevuları onaylama/reddetme

### Teknik Özellikler
- 🚀 Tam containerized yapı (Docker)
- 🔄 Otomatik veritabanı migration (Alembic)
- 🎨 Modern ve responsive tasarım (TailwindCSS)
- 🔒 Güvenli authentication sistemi
- ⚡ Hızlı ve performanslı API (FastAPI)
- 🌐 RESTful API mimarisi

## 🛠 Teknoloji Stack

### Backend
- **FastAPI** - Modern, hızlı Python web framework
- **SQLAlchemy** - ORM (Object Relational Mapping)
- **PostgreSQL** - İlişkisel veritabanı
- **Alembic** - Database migration tool
- **Pydantic** - Data validation
- **python-jose** - JWT token işlemleri
- **Passlib** - Şifre hash'leme

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool ve dev server
- **React Router** - Sayfa yönlendirme
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Web server (Production)
- **PostgreSQL 15 Alpine** - Database container

## 📁 Proje Yapısı

```
dentist_clinic/
├── backend/                    # Backend API
│   ├── alembic/               # Database migrations
│   │   └── versions/          # Migration dosyaları
│   ├── main.py                # FastAPI uygulaması
│   ├── models.py              # SQLAlchemy modelleri
│   ├── database.py            # Veritabanı konfigürasyonu
│   ├── auth.py                # Authentication fonksiyonları
│   ├── requirements.txt       # Python bağımlılıkları
│   ├── Dockerfile             # Backend container tanımı
│   └── alembic.ini            # Alembic konfigürasyonu
│
├── frontend/                   # Frontend UI
│   ├── src/
│   │   ├── components/        # React componentleri
│   │   │   ├── auth/          # Authentication componentleri
│   │   │   ├── layout/        # Layout componentleri
│   │   │   └── ui/            # UI componentleri
│   │   ├── pages/             # Sayfa componentleri
│   │   │   ├── Home.tsx       # Ana sayfa
│   │   │   ├── Booking.tsx    # Randevu oluşturma
│   │   │   ├── Admin.tsx      # Admin paneli
│   │   │   ├── Login.tsx      # Giriş sayfası
│   │   │   └── MyAppointments.tsx
│   │   ├── lib/               # Yardımcı fonksiyonlar
│   │   │   ├── api.ts         # API client
│   │   │   └── utils.ts       # Utility fonksiyonlar
│   │   ├── types/             # TypeScript type tanımları
│   │   ├── App.tsx            # Ana uygulama
│   │   └── main.tsx           # Entry point
│   ├── Dockerfile             # Frontend container tanımı
│   ├── nginx.conf             # Nginx konfigürasyonu
│   ├── package.json           # NPM bağımlılıkları
│   └── vite.config.ts         # Vite konfigürasyonu
│
├── database/                   # Veritabanı dosyaları
│   └── init.sql               # Initial database setup
│
├── docker-compose.yml          # Docker Compose konfigürasyonu
├── LICENSE                     # Lisans dosyası
└── README.md                   # Bu dosya

```

## 🚀 Kurulum

### Ön Gereksinimler
- Docker ve Docker Compose kurulu olmalı
- Git kurulu olmalı

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/RandevuYonetimSistemi/dentist_clinic.git
cd dentist_clinic
```

### Adım 2: Docker ile Çalıştırın
```bash
docker-compose up -d
```

Bu komut:
- PostgreSQL veritabanını oluşturur (Port: 5433)
- Backend API'yi başlatır (Port: 8000)
- Frontend uygulamasını başlatır (Port: 3000)

### Adım 3: Uygulamaya Erişin
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger UI)

### Varsayılan Admin Kullanıcısı
```
Kullanıcı Adı: admin
Şifre: admin123
```

## 💻 Kullanım

### Hasta Olarak Randevu Alma

1. Ana sayfadan "Randevu Al" butonuna tıklayın
2. Kişisel bilgilerinizi doldurun (Ad, Soyad, Email, Telefon)
3. Doktor seçin
4. Hizmet seçin (Genel Kontrol, Dolgu, Kanal Tedavisi vb.)
5. Tarih ve saat seçin
6. İsteğe bağlı notlar ekleyin
7. Randevuyu oluşturun

### Randevularımı Görüntüleme

1. "Randevularım" sayfasına gidin
2. Email adresinizi girin
3. Randevu geçmişinizi görüntüleyin
4. İptal etmek istediğiniz randevuları iptal edin

### Admin Paneli Kullanımı

1. "/login" sayfasından giriş yapın
2. Admin kullanıcı adı ve şifresini girin
3. Admin panelinde:
   - Tüm randevuları görüntüleyin
   - Randevu durumlarını güncelleyin
   - Doktor ekleyin/düzenleyin/silin
   - Hizmet ekleyin/düzenleyin/silin

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - Admin girişi
- `POST /api/logout` - Çıkış

### Randevular (Appointments)
- `GET /api/appointments` - Tüm randevuları listele
- `GET /api/appointments/{id}` - Randevu detayı
- `GET /api/appointments/patient/{email}` - Hastanın randevuları
- `POST /api/appointments` - Yeni randevu oluştur
- `PUT /api/appointments/{id}` - Randevu güncelle
- `DELETE /api/appointments/{id}` - Randevu sil

### Doktorlar (Doctors)
- `GET /api/doctors` - Tüm doktorları listele
- `GET /api/doctors/{id}` - Doktor detayı
- `POST /api/doctors` - Yeni doktor ekle (Admin)
- `PUT /api/doctors/{id}` - Doktor güncelle (Admin)
- `DELETE /api/doctors/{id}` - Doktor sil (Admin)

### Hizmetler (Services)
- `GET /api/services` - Tüm hizmetleri listele
- `POST /api/services` - Yeni hizmet ekle (Admin)
- `PUT /api/services/{id}` - Hizmet güncelle (Admin)
- `DELETE /api/services/{id}` - Hizmet sil (Admin)

### Müsaitlik (Availability)
- `GET /api/available-slots` - Uygun randevu saatlerini getir
  - Query params: `doctor_id`, `date`

## 🗃 Veritabanı Şeması

### Patients (Hastalar)
```sql
- id (PK)
- first_name
- last_name
- email (Unique)
- phone
- date_of_birth
- created_at
```

### Doctors (Doktorlar)
```sql
- id (PK)
- first_name
- last_name
- specialization
- email (Unique)
- phone
- created_at
```

### Services (Hizmetler)
```sql
- id (PK)
- name
- description
- duration_minutes
- price
- created_at
```

### Appointments (Randevular)
```sql
- id (PK)
- patient_id (FK -> patients.id)
- doctor_id (FK -> doctors.id)
- service_id (FK -> services.id)
- appointment_date
- appointment_time
- status (scheduled/completed/cancelled)
- notes
- created_at
```

### Admins (Yöneticiler)
```sql
- id (PK)
- username (Unique)
- password_hash
- created_at
```

## 🔐 Admin Paneli

Admin paneli aşağıdaki özellikleri sunar:

### Randevu Yönetimi
- Tüm randevuları görüntüleme
- Randevu durumunu güncelleme (Scheduled → Completed/Cancelled)
- Randevu detaylarını görüntüleme (Hasta, Doktor, Hizmet bilgileri)
- Randevu silme

### Doktor Yönetimi
- Yeni doktor ekleme
- Doktor bilgilerini düzenleme
- Doktor silme
- Uzmanlık alanı belirtme

### Hizmet Yönetimi
- Yeni hizmet ekleme (ör: İmplant, Ortodonti)
- Hizmet bilgilerini düzenleme
- Hizmet süresi ve fiyat belirleme
- Hizmet silme

## 🎨 Öne Çıkan Özellikler

### 1. Akıllı Randevu Sistemi
- Çakışan randevuları engelleme
- Müsait saatleri otomatik gösterme
- Geçmiş tarihlere randevu alınamama

### 2. Responsive Tasarım
- Mobil uyumlu
- Modern ve temiz arayüz
- TailwindCSS ile styled

### 3. Güvenlik
- JWT token bazlı authentication
- Password hashing (bcrypt)
- Protected routes
- CORS konfigürasyonu

### 4. Database Migrations
- Alembic ile otomatik migration
- Version kontrolü
- Kolay database şema değişiklikleri

## 🔧 Geliştirme Modu

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Database Migration
```bash
cd backend
# Yeni migration oluştur
alembic revision --autogenerate -m "migration açıklaması"

# Migration'ı uygula
alembic upgrade head
```

## 🌟 Gelecek Özellikler

- [ ] Email bildirimleri (Randevu onayı, hatırlatma)
- [ ] SMS bildirimleri
- [ ] Online ödeme entegrasyonu
- [ ] Hasta geçmişi ve dosyaları
- [ ] Takvim entegrasyonu (Google Calendar)
- [ ] Çoklu dil desteği
- [ ] Raporlama ve istatistikler
- [ ] Hasta yorumları ve değerlendirme sistemi

## 🐛 Bilinen Sorunlar

Şu an için bilinen kritik bir sorun bulunmamaktadır. Bir sorun bulduğunuzda lütfen [GitHub Issues](https://github.com/RandevuYonetimSistemi/dentist_clinic/issues) üzerinden bildiriniz.

## 🤝 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakınız.

## 👥 İletişim

Proje Sahibi: RandevuYonetimSistemi

GitHub: [https://github.com/RandevuYonetimSistemi](https://github.com/RandevuYonetimSistemi)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
Randevu Yönetim-Takip Sistemi
