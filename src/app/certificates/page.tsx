'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const certificates = [
    {
        path: '/certificates/ADASU Makine Çevre İzin Belgesi.pdf',
        nameTr: 'ADASU Makine Çevre İzin Belgesi',
        nameEn: 'ADASU Machine Environmental Permit Certificate',
    },
    {
        path: '/certificates/EU_Declaration_of_Conformity_Çeker ocak.pdf',
        nameTr: 'AB Uygunluk Beyanı (Çeker Ocak)',
        nameEn: 'EU Declaration of Conformity (Fume Hood)',
    },
    {
        path: '/certificates/EU_Declaration_of_Conformity_GALLIUM 68 & LUTESYUM 177 ÇALIŞMA KABİNİ.pdf',
        nameTr: 'AB Uygunluk Beyanı (Gallium 68 & Lutesyum 177 Çalışma Kabini)',
        nameEn: 'EU Declaration of Conformity (Gallium 68 & Lutetium 177 Work Cabinet)',
    },
    {
        path: '/certificates/EU_Declaration_of_Conformity_Kuru Isıtıcı.pdf',
        nameTr: 'AB Uygunluk Beyanı (Kuru Isıtıcı)',
        nameEn: 'EU Declaration of Conformity (Dry Heater)',
    },
    {
        path: '/certificates/MARKA TESCİL BELGESİ 1.pdf',
        nameTr: 'Marka Tescil Belgesi',
        nameEn: 'Trademark Registration Certificate',
    },
    {
        path: '/certificates/TS EN 12588 BELGESİ.JPG',
        nameTr: 'TS EN 12588 Belgesi',
        nameEn: 'TS EN 12588 Certificate',
    },
    {
        path: '/certificates/UN2915.jpg',
        nameTr: 'UN2915 Sertifikası',
        nameEn: 'UN2915 Certificate',
    },
    {
        path: '/certificates/yerli malı belgesi.pdf',
        nameTr: 'Yerli Malı Belgesi',
        nameEn: 'Domestic Goods Certificate',
    },
];

export default function CertificatesPage() {
    const { t, language } = useLanguage();
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </div>
            <main className="flex-1 pt-28 pb-12 px-2 sm:px-4 bg-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center tracking-tight text-blue-700 drop-shadow">
                    {t('nav.documents')}
                </h1>
                <div className="max-w-3xl mx-auto">
                    <ul className="space-y-5">
                        {certificates.map((cert) => (
                            <li key={cert.path} className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-5 shadow hover:shadow-lg transition group">
                                <span className="block font-medium text-lg text-gray-800 group-hover:text-blue-700 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
                                    {language === 'en' ? cert.nameEn : cert.nameTr}
                                </span>
                                <a
                                    href={cert.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 sm:mt-0 sm:ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-base shadow"
                                >
                                    {language === 'en' ? 'Download / View' : 'İndir / Görüntüle'}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
} 