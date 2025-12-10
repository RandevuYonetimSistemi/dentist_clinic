import React from 'react';
import toothLogo from "/src/assets/tooth-logo.png";


export const Footer = () => {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-50 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                                <img src={toothLogo} alt="logo" className="h-5 w-5 object-contain" />

                            </div>
                            <span className="text-lg font-bold text-neutral-900">Diş Kliniği</span>
                        </div>
                        <p className="text-sm text-neutral-500">
                            Modern teknoloji ve uzman kadromuzla gülüşünüzü güzelleştiriyoruz.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-neutral-900">Hızlı Linkler</h3>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li><a href="/" className="hover:text-primary-600">Ana Sayfa</a></li>
                            <li><a href="/book" className="hover:text-primary-600">Randevu Al</a></li>
                            <li><a href="/my-appointments" className="hover:text-primary-600">Randevularım</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-neutral-900">İletişim</h3>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li>info@disklinigi.com</li>
                            <li>+90 (212) 555 0000</li>
                            <li>İstanbul, Türkiye</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold text-neutral-900">Çalışma Saatleri</h3>
                        <ul className="space-y-2 text-sm text-neutral-600">
                            <li>Pazartesi - Cuma: 09:00 - 18:00</li>
                            <li>Cumartesi: 09:00 - 14:00</li>
                            <li>Pazar: Kapalı</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
                    © {new Date().getFullYear()} Diş Kliniği Randevu Sistemi. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
};
