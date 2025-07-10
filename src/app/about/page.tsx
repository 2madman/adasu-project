'use client';

import React, { useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useLanguage } from '@/app/context/LanguageContext';

export default function AboutPage() {
    const { t, language } = useLanguage();

    // Handle language-based navigation
    useEffect(() => {
        // Only run this effect once on component mount
        const hasBeenRedirected = sessionStorage.getItem('aboutPageVisited');

        if (!hasBeenRedirected) {
            // Mark that we've visited the page to prevent future redirects
            sessionStorage.setItem('aboutPageVisited', 'true');

            // If they access /about directly while having 'en' in localStorage
            if (language === 'en' && typeof window !== 'undefined') {
                const path = window.location.pathname;
                if (path === '/about') {
                    window.location.href = '/en/about';
                }
            }
        }

        // Cleanup function - we don't remove the flag as it should persist
        return () => {
            // Remove old flags for compatibility
            sessionStorage.removeItem('redirected_about');
            sessionStorage.removeItem('language_redirected');
            // Don't remove aboutPageVisited as it should persist
        };
    }, []); // Empty dependency array ensures it only runs once

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Background Image and Overlay */}
            <div className="relative pt-28 pb-16 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/main.jpeg"
                        alt="About Background"
                        className="w-full h-full object-cover opacity-30 pointer-events-none select-none"
                        style={{ position: 'absolute', inset: 0 }}
                    />
                    <div className="absolute inset-0 bg-white/30" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{t('about.title')}</h1>

                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">{t('about.nuclear.title')}</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {t('about.nuclear.p1')}
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {t('about.nuclear.p2')}
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {t('about.nuclear.p3')}
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">{t('about.maritime.title')}</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {t('about.maritime.p1')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-blue-800 mb-4">{t('about.construction.title')}</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                {t('about.construction.p1')}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
