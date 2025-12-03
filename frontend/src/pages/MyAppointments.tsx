import React, { useState } from 'react';
import { api } from '../lib/api';
import { Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Calendar, Clock, User, XCircle, Search, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const MyAppointments = () => {
    const [email, setEmail] = useState('');
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const res = await api.get<Appointment[]>(`/appointments/email/${email}`);
            setAppointments(res.data);
            setSearched(true);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            alert('Randevular getirilirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id: number) => {
        if (!window.confirm('Randevuyu iptal etmek istediğinize emin misiniz?')) return;

        try {
            await api.delete(`/appointments/${id}`);
            // Update list locally
            setAppointments(appointments.map(apt =>
                apt.id === id ? { ...apt, status: 'cancelled' } : apt
            ));
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Randevu iptal edilirken bir hata oluştu.');
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold text-neutral-900">Randevularım</h1>

            <Card className="mb-12 p-8">
                <form onSubmit={handleSearch} className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <Input
                        label="E-posta Adresiniz"
                        type="email"
                        placeholder="ornek@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                    />
                    <Button type="submit" isLoading={loading}>
                        <Search className="mr-2 h-4 w-4" /> Sorgula
                    </Button>
                </form>
            </Card>

            {searched && (
                <div className="space-y-6">
                    {appointments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center">
                            <AlertCircle className="mb-4 h-12 w-12 text-neutral-400" />
                            <h3 className="text-lg font-medium text-neutral-900">Randevu Bulunamadı</h3>
                            <p className="text-neutral-500">Bu e-posta adresi ile kayıtlı randevu bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {appointments.map((apt) => (
                                <Card key={apt.id} className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "flex h-12 w-12 items-center justify-center rounded-full",
                                                apt.status === 'cancelled' ? "bg-red-100 text-red-600" : "bg-primary-100 text-primary-600"
                                            )}>
                                                <Calendar className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-neutral-900">
                                                    {new Date(apt.appointment_date).toLocaleDateString('tr-TR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{apt.appointment_time.substring(0, 5)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-neutral-700">
                                            <User className="h-5 w-5 text-neutral-400" />
                                            <span className="font-medium">{apt.doctor_name}</span>
                                        </div>

                                        {apt.status === 'cancelled' && (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                İptal Edildi
                                            </span>
                                        )}
                                    </div>

                                    {apt.status !== 'cancelled' && (
                                        <Button
                                            variant="outline"
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                                            onClick={() => handleCancel(apt.id)}
                                        >
                                            <XCircle className="mr-2 h-4 w-4" /> İptal Et
                                        </Button>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
