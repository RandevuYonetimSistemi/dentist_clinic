import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Stethoscope } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        <Stethoscope className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold text-neutral-900">Diş Kliniği</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary-600',
                            isActive('/') ? 'text-primary-600' : 'text-neutral-600'
                        )}
                    >
                        Ana Sayfa
                    </Link>
                    <Link
                        to="/my-appointments"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary-600',
                            isActive('/my-appointments') ? 'text-primary-600' : 'text-neutral-600'
                        )}
                    >
                        Randevularım
                    </Link>
                    <Link to="/book">
                        <Button size="sm">Randevu Al</Button>
                    </Link>
                    <Link
                        to="/admin"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary-600',
                            isActive('/admin') ? 'text-primary-600' : 'text-neutral-600'
                        )}
                    >
                        Yönetim Paneli
                    </Link>
                </div>
            </div>
        </nav>
    );
};
