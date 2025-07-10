'use client';

import Image from 'next/image';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { useRouter } from 'next/navigation';

const cnrImages = [
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36.jpeg',
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (1).jpeg',
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (2).jpeg',
];
const kongreImages = [
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35.jpeg',
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35 (1).jpeg',
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.36.jpeg',
];

export default function MediaPage() {
    const { t } = useLanguage();
    const router = useRouter();

    // Card click handlers
    const goToCnrGallery = () => router.push('/media/cnrexpomed');
    const goToKongreGallery = () => router.push('/media/kibriskongre');

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex flex-col items-center mt-24">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 text-center tracking-tight">{t('media.title')}</h1>
                <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">{t('media.subtitle')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                    {/* CNR Expomed Card */}
                    <div
                        className="group bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
                        onClick={goToCnrGallery}
                    >
                        <div className="relative w-full h-40 overflow-hidden">
                            <Image src={cnrImages[0]} alt="CNR Expomed 2024" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors">{t('media.cnrexpomed.title')}</h2>
                            <p className="text-gray-700 mb-4 flex-1 text-base">{t('media.cnrexpomed.desc')}</p>
                            <div className="flex gap-3 mb-6">
                                {cnrImages.slice(1).map((img, i) => (
                                    <div key={img} className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                                        <Image src={img} alt={`CNR Expomed 2024 ${i + 2}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg shadow transition self-end text-base tracking-wide group-hover:scale-105 group-active:scale-95"
                                onClick={e => { e.stopPropagation(); goToCnrGallery(); }}
                                style={{ cursor: 'pointer' }}
                            >
                                {t('media.readmore')}
                            </button>
                        </div>
                    </div>
                    {/* Kıbrıs Kongre Card */}
                    <div
                        className="group bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
                        onClick={goToKongreGallery}
                    >
                        <div className="relative w-full h-40 overflow-hidden">
                            <Image src={kongreImages[0]} alt="2024 Kıbrıs Nükleer Tıp Kongresi" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors">{t('media.kibriskongre.title')}</h2>
                            <p className="text-gray-700 mb-4 flex-1 text-base">{t('media.kibriskongre.desc')}</p>
                            <div className="flex gap-3 mb-6">
                                {kongreImages.slice(1).map((img, i) => (
                                    <div key={img} className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                                        <Image src={img} alt={`Kıbrıs Kongre 2024 ${i + 2}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg shadow transition self-end text-base tracking-wide group-hover:scale-105 group-active:scale-95"
                                onClick={e => { e.stopPropagation(); goToKongreGallery(); }}
                                style={{ cursor: 'pointer' }}
                            >
                                {t('media.readmore')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
