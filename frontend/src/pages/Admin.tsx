import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Doctor, Service, Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Plus, Pencil, Trash2, X, Save, CheckCircle, XCircle, Calendar } from 'lucide-react';

export const Admin = () => {
    const [activeTab, setActiveTab] = useState<'doctors' | 'services' | 'appointments'>('doctors');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [doctorForm, setDoctorForm] = useState({
        first_name: '',
        last_name: '',
        specialization: '',
        email: '',
        phone: '',
    });
    const [serviceForm, setServiceForm] = useState({
        name: '',
        description: '',
        duration_minutes: 30,
        price: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [doctorsRes, servicesRes, appointmentsRes] = await Promise.all([
                api.get<Doctor[]>('/doctors'),
                api.get<Service[]>('/services'),
                api.get<Appointment[]>('/appointments'),
            ]);
            setDoctors(doctorsRes.data);
            setServices(servicesRes.data);
            setAppointments(appointmentsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && editingId) {
                await api.put(`/doctors/${editingId}`, doctorForm);
            } else {
                await api.post('/doctors', doctorForm);
            }
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error saving doctor:', error);
            alert('Hata oluştu. Lütfen bilgileri kontrol ediniz.');
        }
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && editingId) {
                await api.put(`/services/${editingId}`, serviceForm);
            } else {
                await api.post('/services', serviceForm);
            }
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Hata oluştu. Lütfen bilgileri kontrol ediniz.');
        }
    };

    const handleDeleteDoctor = async (id: number) => {
        if (!window.confirm('Bu doktoru silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/doctors/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const handleDeleteService = async (id: number) => {
        if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/services/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const startEditDoctor = (doctor: Doctor) => {
        setDoctorForm({
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            specialization: doctor.specialization,
            email: doctor.email,
            phone: doctor.phone,
        });
        setEditingId(doctor.id);
        setIsEditing(true);
        setActiveTab('doctors');
    };

    const startEditService = (service: Service) => {
        setServiceForm({
            name: service.name,
            description: service.description,
            duration_minutes: service.duration_minutes,
            price: service.price,
        });
        setEditingId(service.id);
        setIsEditing(true);
        setActiveTab('services');
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setDoctorForm({
            first_name: '',
            last_name: '',
            specialization: '',
            email: '',
            phone: '',
        });
        setServiceForm({
            name: '',
            description: '',
            duration_minutes: 30,
            price: 0,
        });
    };

    const handleApproveAppointment = async (id: number) => {
        try {
            await api.put(`/appointments/${id}/approve`);
            fetchData();
        } catch (error) {
            console.error('Error approving appointment:', error);
            alert('Randevu onaylanırken hata oluştu.');
        }
    };

    const handleRejectAppointment = async (id: number) => {
        if (!window.confirm('Bu randevuyu reddetmek istediğinize emin misiniz?')) return;
        try {
            await api.put(`/appointments/${id}/reject`);
            fetchData();
        } catch (error) {
            console.error('Error rejecting appointment:', error);
            alert('Randevu reddedilirken hata oluştu.');
        }
    };

    const handleDeleteAppointment = async (id: number) => {
        if (!window.confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/appointments/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Randevu silinirken hata oluştu.');
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { label: string; className: string }> = {
            pending: { label: 'Beklemede', className: 'bg-yellow-100 text-yellow-800' },
            confirmed: { label: 'Onaylandı', className: 'bg-green-100 text-green-800' },
            cancelled: { label: 'İptal Edildi', className: 'bg-red-100 text-red-800' },
        };
        const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Yönetim Paneli</h1>

            <div className="flex gap-4 mb-8">
                <Button
                    variant={activeTab === 'doctors' ? 'primary' : 'outline'}
                    onClick={() => { setActiveTab('doctors'); resetForm(); }}
                >
                    Doktorlar
                </Button>
                <Button
                    variant={activeTab === 'services' ? 'primary' : 'outline'}
                    onClick={() => { setActiveTab('services'); resetForm(); }}
                >
                    Hizmetler
                </Button>
                <Button
                    variant={activeTab === 'appointments' ? 'primary' : 'outline'}
                    onClick={() => { setActiveTab('appointments'); resetForm(); }}
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    Randevular
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Form Section */}
                {activeTab !== 'appointments' && (
                <Card className="p-6 h-fit lg:col-span-1">
                    <h2 className="text-xl font-bold mb-4">
                        {isEditing ? 'Düzenle' : 'Yeni Ekle'}
                    </h2>
                    {activeTab === 'doctors' ? (
                        <form onSubmit={handleDoctorSubmit} className="space-y-4">
                            <Input
                                label="Ad"
                                value={doctorForm.first_name}
                                onChange={(e) => setDoctorForm({ ...doctorForm, first_name: e.target.value })}
                                required
                            />
                            <Input
                                label="Soyad"
                                value={doctorForm.last_name}
                                onChange={(e) => setDoctorForm({ ...doctorForm, last_name: e.target.value })}
                                required
                            />
                            <Input
                                label="Uzmanlık"
                                value={doctorForm.specialization}
                                onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                            />
                            <Input
                                label="E-posta"
                                type="email"
                                value={doctorForm.email}
                                onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Telefon"
                                value={doctorForm.phone}
                                onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                            />
                            <div className="flex gap-2">
                                <Button type="submit" className="w-full">
                                    <Save className="w-4 h-4 mr-2" /> Kaydet
                                </Button>
                                {isEditing && (
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleServiceSubmit} className="space-y-4">
                            <Input
                                label="Hizmet Adı"
                                value={serviceForm.name}
                                onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                                required
                            />
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-neutral-700">Açıklama</label>
                                <textarea
                                    className="w-full rounded-lg border border-neutral-300 p-2 focus:border-primary-500 focus:ring-primary-500"
                                    rows={3}
                                    value={serviceForm.description}
                                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                />
                            </div>
                            <Input
                                label="Süre (dk)"
                                type="number"
                                value={serviceForm.duration_minutes}
                                onChange={(e) => setServiceForm({ ...serviceForm, duration_minutes: parseInt(e.target.value) })}
                                required
                            />
                            <Input
                                label="Ücret (₺)"
                                type="number"
                                value={serviceForm.price}
                                onChange={(e) => setServiceForm({ ...serviceForm, price: parseFloat(e.target.value) })}
                                required
                            />
                            <div className="flex gap-2">
                                <Button type="submit" className="w-full">
                                    <Save className="w-4 h-4 mr-2" /> Kaydet
                                </Button>
                                {isEditing && (
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </Card>
                )}

                {/* List Section */}
                <div className={activeTab === 'appointments' ? 'lg:col-span-3 space-y-4' : 'lg:col-span-2 space-y-4'}>
                    {activeTab === 'doctors' ? (
                        doctors.map((doctor) => (
                            <Card key={doctor.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{doctor.first_name} {doctor.last_name}</h3>
                                    <p className="text-neutral-600">{doctor.specialization}</p>
                                    <p className="text-sm text-neutral-500">{doctor.email}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => startEditDoctor(doctor)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteDoctor(doctor.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : activeTab === 'services' ? (
                        services.map((service) => (
                            <Card key={service.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{service.name}</h3>
                                    <p className="text-neutral-600">{service.description}</p>
                                    <div className="flex gap-4 text-sm text-neutral-500 mt-1">
                                        <span>{service.duration_minutes} dk</span>
                                        <span className="font-bold text-primary-600">₺{service.price}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => startEditService(service)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteService(service.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        appointments.map((appointment) => (
                            <Card key={appointment.id} className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-lg">{appointment.patient_name}</h3>
                                            {getStatusBadge(appointment.status)}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-neutral-600">
                                            <div>
                                                <span className="font-medium">Doktor:</span> {appointment.doctor_name}
                                            </div>
                                            <div>
                                                <span className="font-medium">Hizmet:</span> {appointment.service_name}
                                            </div>
                                            <div>
                                                <span className="font-medium">Tarih:</span> {new Date(appointment.appointment_date).toLocaleDateString('tr-TR')}
                                            </div>
                                            <div>
                                                <span className="font-medium">Saat:</span> {appointment.appointment_time}
                                            </div>
                                        </div>
                                        {appointment.notes && (
                                            <div className="mt-2 text-sm text-neutral-500">
                                                <span className="font-medium">Not:</span> {appointment.notes}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {appointment.status === 'pending' && (
                                            <>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="text-green-600 hover:text-green-700 hover:border-green-600"
                                                    onClick={() => handleApproveAppointment(appointment.id)}
                                                    title="Onayla"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="text-red-600 hover:text-red-700 hover:border-red-600"
                                                    onClick={() => handleRejectAppointment(appointment.id)}
                                                    title="Reddet"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </>
                                        )}
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="text-red-600 hover:text-red-700"
                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
