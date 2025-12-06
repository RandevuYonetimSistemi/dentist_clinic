import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { Doctor, Service } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Calendar, Clock, Shield, Star, User } from 'lucide-react';

export const Home = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, doctorsRes] = await Promise.all([
                    api.get<Service[]>('/services'),
                    api.get<Doctor[]>('/doctors'),
                ]);
                setServices(servicesRes.data);
                setDoctors(doctorsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-50 py-20 sm:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
                                Gülüşünüz Bizim İçin <span className="text-primary-600">Değerli</span>
                            </h1>
                            <p className="text-lg text-neutral-600">
                                Modern teknoloji ve uzman kadromuzla, ağız ve diş sağlığınız için en iyi hizmeti sunuyoruz. Hemen randevunuzu oluşturun.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/book">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Hemen Randevu Al
                                    </Button>
                                </Link>
                                <a href="#services">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Hizmetlerimiz
                                    </Button>
                                </a>
                            </div>
                            <div className="flex items-center gap-8 pt-8 text-neutral-600">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary-600" />
                                    <span className="text-sm font-medium">Güvenilir Hizmet</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-primary-600" />
                                    <span className="text-sm font-medium">Uzman Kadro</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary-600" />
                                    <span className="text-sm font-medium">7/24 Destek</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:ml-auto">
                            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl lg:h-[500px] lg:w-[500px]">
                                <img
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
                                    alt="Diş Kliniği"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl bg-primary-100/50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="container mx-auto px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Hizmetlerimiz</h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        Size özel sunduğumuz tedavi ve bakım hizmetleri
                    </p>
                </div>

                {loading ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 animate-pulse rounded-xl bg-neutral-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service.id} hover className="flex flex-col">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                                    <Star className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-neutral-900">{service.name}</h3>
                                <p className="mb-4 flex-1 text-neutral-600">{service.description}</p>
                                <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <Clock className="h-4 w-4" />
                                        <span>{service.duration_minutes} dk</span>
                                    </div>
                                    <span className="text-lg font-bold text-primary-600">
                                        ₺{service.price}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Doctors Section */}
            <section className="bg-neutral-50 py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Uzman Doktorlarımız</h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            Alanında uzman hekimlerimizle tanışın
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-80 animate-pulse rounded-xl bg-neutral-200" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {doctors.map((doctor) => (
                                <Card key={doctor.id} hover className="text-center">
                                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                        <User className="h-16 w-16" />
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900">
                                        {doctor.first_name} {doctor.last_name}
                                    </h3>
                                    <p className="mb-4 text-primary-600 font-medium">{doctor.specialization}</p>
                                    <div className="space-y-2 text-sm text-neutral-600">
                                        <p>{doctor.email}</p>
                                        <p>{doctor.phone}</p>
                                    </div>
                                    <Link to={`/book?doctor=${doctor.id}`} className="mt-6 block">
                                        <Button variant="outline" className="w-full cursor-pointer">
                                            Randevu Al
                                        </Button>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
