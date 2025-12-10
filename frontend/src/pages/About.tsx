import React from 'react';
import { Shield, Star, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const About = () => {
    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-50 py-20 sm:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
                            Her Gülüşe Değer Veriyoruz.
                        </h1>
                        <h2 className="mt-6 text-3xl font-bold text-primary-600">Hakkımızda</h2>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl space-y-8">
                    {/* History */}
                    <Card className="p-8">
                        <h3 className="mb-4 text-2xl font-bold text-neutral-900">Kliniğimizin Hikayesi</h3>
                        <p className="text-lg text-neutral-700 leading-relaxed">
                            Dt. Niyazi Ayverdi Diş Kliniği Diş Hekimi Niyazi Ayverdi'nin önderliği ve uzman hekim kadrosuyla 
                            2021 yılında kurulmuştur. Kısa süre içinde bölgede güvenilir bir isim haline gelen kliniğimiz, 
                            modern teknoloji ve hastaya odaklı hizmet anlayışıyla dikkat çekmektedir.
                        </p>
                    </Card>

                    {/* Mission */}
                    <Card className="p-8">
                        <h3 className="mb-4 text-2xl font-bold text-neutral-900">Misyonumuz</h3>
                        <p className="text-lg text-neutral-700 leading-relaxed">
                            Dt. Niyazi Ayverdi Diş Kliniği siz değerli hastalarımıza, rahat ve huzur verici ortamıyla, 
                            güler yüzlü personeliyle, uzman kadrosuyla hizmet vermekte, daha güzel bir gülümsemeye sahip 
                            olmanızı sağlayarak sağlıklı ve mutlu bir yaşama davet etmektedir.
                        </p>
                    </Card>

                    {/* Standards */}
                    <Card className="p-8">
                        <h3 className="mb-4 text-2xl font-bold text-neutral-900">Standartlarımız</h3>
                        <p className="text-lg text-neutral-700 leading-relaxed">
                            Kliniğimizde hijyen standartları en üst düzeyde uygulanmakta olup, gelişen teknoloji sürekli 
                            takip edilerek dünya standartlarında koruyucu, tedavi edici ve estetik diş hekimliği hizmetleri 
                            sunulmaktadır. Hasta memnuniyeti ve sağlığı bizim en öncelikli hedefimizdir.
                        </p>
                    </Card>

                    {/* Vision */}
                    <Card className="p-8">
                        <h3 className="mb-4 text-2xl font-bold text-neutral-900">Vizyonumuz</h3>
                        <p className="text-lg text-neutral-700 leading-relaxed">
                            Dt. Niyazi Ayverdi Diş Kliniği ağız ve diş sağlığına özen gösteren ve güzel dişlere sahip olmak 
                            isteyen herkesin, çağdaş diş hekimliğinin sunduğu tüm hizmetlerden yararlanması için kurulmuştur. 
                            Her hastamız için en iyi hizmeti sunmak ve onların sağlıklı bir gülüşle hayatlarını devam ettirmelerini 
                            sağlamak bizim temel amacımızdır.
                        </p>
                    </Card>

                    {/* Values */}
                    <section className="py-8">
                        <h3 className="mb-8 text-2xl font-bold text-neutral-900">Değerlerimiz</h3>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Card className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                    <Shield className="h-8 w-8" />
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-neutral-900">Güvenilirlik</h4>
                                <p className="text-neutral-600">
                                    Hasta güvenini ön planda tutarak, profesyonel ve etik standartlarda hizmet sunarız.
                                </p>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                    <Star className="h-8 w-8" />
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-neutral-900">Kalite</h4>
                                <p className="text-neutral-600">
                                    En iyi teknoloji ve deneyimli kadromuzla yüksek kaliteli hizmet sağlarız.
                                </p>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                    <Award className="h-8 w-8" />
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-neutral-900">Mükemmellik</h4>
                                <p className="text-neutral-600">
                                    Sürekli gelişim ve öğrenmeyle mükemmelliği hedefleyerek hizmetlerimizi geliştiririz.
                                </p>
                            </Card>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};
