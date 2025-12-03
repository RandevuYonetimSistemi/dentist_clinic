import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Doctor, AvailableSlot, Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { User, Calendar as CalendarIcon, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Booking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [patientDetails, setPatientDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        notes: '',
    });

    // Fetch doctors on mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get<Doctor[]>('/doctors');
                setDoctors(res.data);

                // Pre-select doctor if in URL
                const doctorId = searchParams.get('doctor');
                if (doctorId) {
                    const doctor = res.data.find(d => d.id === parseInt(doctorId));
                    if (doctor) {
                        setSelectedDoctor(doctor);
                        setStep(2);
                    }
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, [searchParams]);

    // Fetch available slots when doctor and date change
    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            const fetchSlots = async () => {
                setLoading(true);
                try {
                    const res = await api.get<AvailableSlot[]>('/appointments/available', {
                        params: {
                            doctor_id: selectedDoctor.id,
                            start_date: selectedDate,
                            end_date: selectedDate, // Just for one day for now, or could be range
                        }
                    });
                    setAvailableSlots(res.data);
                } catch (error) {
                    console.error('Error fetching slots:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchSlots();
        }
    }, [selectedDoctor, selectedDate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setSelectedTime(''); // Reset time when date changes
    };

    const handleSubmit = async () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) return;

        setLoading(true);
        try {
            await api.post('/appointments', {
                ...patientDetails,
                doctor_id: selectedDoctor.id,
                appointment_date: selectedDate,
                appointment_time: selectedTime,
            });
            setStep(4); // Success step
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Randevu oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { number: 1, title: 'Doktor Seçimi' },
        { number: 2, title: 'Tarih ve Saat' },
        { number: 3, title: 'Kişisel Bilgiler' },
        { number: 4, title: 'Onay' },
    ];

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            {/* Progress Steps */}
            <div className="mb-12">
                <div className="flex items-center justify-between">
                    {steps.map((s) => (
                        <div key={s.number} className="flex flex-col items-center relative z-10">
                            <div
                                className={cn(
                                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-colors',
                                    step >= s.number
                                        ? 'border-primary-600 bg-primary-600 text-white'
                                        : 'border-neutral-300 bg-white text-neutral-400'
                                )}
                            >
                                {step > s.number ? <CheckCircle className="h-6 w-6" /> : s.number}
                            </div>
                            <span
                                className={cn(
                                    'mt-2 text-sm font-medium',
                                    step >= s.number ? 'text-primary-600' : 'text-neutral-400'
                                )}
                            >
                                {s.title}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Background - simplified for now */}
                </div>
            </div>

            <Card className="p-8">
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900">Doktor Seçimi</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    onClick={() => setSelectedDoctor(doctor)}
                                    className={cn(
                                        'cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-primary-400',
                                        selectedDoctor?.id === doctor.id
                                            ? 'border-primary-600 bg-primary-50'
                                            : 'border-neutral-200 bg-white'
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-neutral-900">
                                                {doctor.first_name} {doctor.last_name}
                                            </h3>
                                            <p className="text-sm text-neutral-600">{doctor.specialization}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!selectedDoctor}
                            >
                                Devam Et <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900">Tarih ve Saat Seçimi</h2>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-neutral-700">Tarih Seçiniz</label>
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="w-full rounded-lg border border-neutral-300 p-2 focus:border-primary-500 focus:ring-primary-500"
                            />
                        </div>

                        {selectedDate && (
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-neutral-700">Saat Seçiniz</label>
                                {loading ? (
                                    <div className="text-center py-4 text-neutral-500">Saatler yükleniyor...</div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot.time}
                                                disabled={!slot.available}
                                                onClick={() => setSelectedTime(slot.time)}
                                                className={cn(
                                                    'rounded-lg border py-2 text-sm font-medium transition-colors',
                                                    !slot.available
                                                        ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400'
                                                        : selectedTime === slot.time
                                                            ? 'border-primary-600 bg-primary-600 text-white'
                                                            : 'border-neutral-200 hover:border-primary-400 hover:text-primary-600'
                                                )}
                                            >
                                                {slot.time.substring(0, 5)}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-neutral-500">Bu tarihte uygun saat bulunmamaktadır.</div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between pt-6">
                            <Button variant="outline" onClick={() => setStep(1)}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Geri
                            </Button>
                            <Button
                                onClick={() => setStep(3)}
                                disabled={!selectedDate || !selectedTime}
                            >
                                Devam Et <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-neutral-900">Kişisel Bilgiler</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Input
                                label="Ad"
                                value={patientDetails.first_name}
                                onChange={(e) => setPatientDetails({ ...patientDetails, first_name: e.target.value })}
                                required
                            />
                            <Input
                                label="Soyad"
                                value={patientDetails.last_name}
                                onChange={(e) => setPatientDetails({ ...patientDetails, last_name: e.target.value })}
                                required
                            />
                            <Input
                                label="E-posta"
                                type="email"
                                value={patientDetails.email}
                                onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Telefon"
                                type="tel"
                                value={patientDetails.phone}
                                onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                                required
                            />
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-neutral-700">Notlar (İsteğe bağlı)</label>
                                <textarea
                                    className="w-full rounded-lg border border-neutral-300 p-2 focus:border-primary-500 focus:ring-primary-500"
                                    rows={3}
                                    value={patientDetails.notes}
                                    onChange={(e) => setPatientDetails({ ...patientDetails, notes: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between pt-6">
                            <Button variant="outline" onClick={() => setStep(2)}>
                                <ChevronLeft className="mr-2 h-4 w-4" /> Geri
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                isLoading={loading}
                                disabled={!patientDetails.first_name || !patientDetails.last_name || !patientDetails.email || !patientDetails.phone}
                            >
                                Randevuyu Onayla
                            </Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center py-12">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-neutral-900">Randevunuz Oluşturuldu!</h2>
                        <p className="mb-8 text-lg text-neutral-600">
                            Randevu detaylarınız e-posta adresinize gönderilmiştir.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => navigate('/')} variant="outline">
                                Ana Sayfaya Dön
                            </Button>
                            <Button onClick={() => navigate('/my-appointments')}>
                                Randevularım
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};
