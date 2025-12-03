import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Lock } from 'lucide-react';

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const res = await api.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            localStorage.setItem('token', res.data.access_token);
            navigate('/admin');
        } catch (err: any) {
            console.error('Login error:', err);
            setError('Kullanıcı adı veya şifre hatalı.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
            <Card className="w-full max-w-md p-8">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-900">Yönetici Girişi</h1>
                    <p className="text-neutral-600">Devam etmek için lütfen giriş yapınız</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        label="Kullanıcı Adı"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Şifre"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" isLoading={loading}>
                        Giriş Yap
                    </Button>
                </form>
            </Card>
        </div>
    );
};
