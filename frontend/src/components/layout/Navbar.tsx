import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import toothLogo from "/src/assets/tooth-logo.png";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = async () => {
        try {
            // Optional: Call backend logout endpoint
            await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500 ease-in-out
            ${scrolled ? "h-12 shadow-md bg-white/90" : "bg-white/80"}`}>
            <div
                className={`container mx-auto flex items-center justify-between transition-all duration-500 ease-in-out 
                ${scrolled ? "h-12 py-1" : "h-20 py-4"}`}
            >




                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                            <img
                                src={toothLogo}
                                alt="logo"
                                className="h-6 w-6 object-contain"
                            />
                        </div>

                    </div>
                    <span className="text-xl font-bold text-neutral-900">Niyazi Ayverdi Diş Kliniği</span>
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
                    <Link
                        to="/about"
                        className={cn(
                            'text-sm font-medium transition-colors hover:text-primary-600',
                            isActive('/about') ? 'text-primary-600' : 'text-neutral-600'
                        )}
                    >
                        Hakkımızda
                    </Link>
                    {isAuthenticated && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Çıkış Yap
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
};

