'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';

export default function ContactPage() {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    // If someone accesses this page directly from URL, ensure language consistency
    useEffect(() => {
        // Only run this effect once on component mount
        const hasBeenRedirected = sessionStorage.getItem('contactPageVisited');

        if (!hasBeenRedirected) {
            // Mark that we've visited the page to prevent future redirects
            sessionStorage.setItem('contactPageVisited', 'true');

            // If they access /contact directly while having 'en' in localStorage
            // Redirect them to /en/contact for consistency
            if (language === 'en' && typeof window !== 'undefined') {
                const path = window.location.pathname;
                if (path === '/contact') {
                    window.location.href = '/en/contact';
                }
            }
        }

        // Cleanup function to remove the flag when component unmounts
        return () => {
            // Don't remove the flag as it should persist across page loads
        };
    }, []); // Empty dependency array ensures it only runs once

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero Image Section */}
            <div className="bg-gray-200 flex items-start justify-center pt-4 mt-16 min-h-[300px] relative overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/resim.png"
                    alt="Main Background"
                    fill
                    className="object-cover opacity-30 pointer-events-none select-none z-0"
                    priority
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-white/30 z-10" />
                <div className="container mx-auto px-6 py-4 text-center relative z-20 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 mt-8">{t('contact.title')}</h1>
                    <p className="text-xl text-gray-600 mt-2 mb-8">{t('contact.subtitle')}</p>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.info.title')}</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('contact.address.label')}</h3>
                                    <p className="text-gray-600">AKSE MAHALLESİ 471.SOKAK NO:8 ÇAYIROVA /GEBZE / KOCAELİ</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaWhatsapp size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">WhatsApp</h3>
                                    <a
                                        href="https://wa.me/905547810379"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline hover:text-blue-600 text-gray-600 block"
                                        title="WhatsApp ile iletişime geçin"
                                    >
                                        0554 781 03 79
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('contact.phone.label')}</h3>
                                    <p className="text-gray-600">0262 643 91 96 - 0262 742 01 00</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaFax size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('contact.fax.label')}</h3>
                                    <p className="text-gray-600">0262 643 78 73</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4 text-blue-500">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('contact.email.label')}</h3>
                                    <p className="text-gray-600">info@adarad.net</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('contact.hours.title')}</h3>
                            <div className="space-y-2">
                                <p className="text-gray-600">{t('contact.hours.weekdays')}</p>
                                <p className="text-gray-600">{t('contact.hours.weekend')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-start justify-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form.contactus')}</h2>
                        <p className="text-gray-700 mb-8">
                            {t('contact.form.contactus.desc')}
                        </p>
                        <a
                            href="mailto:info@adarad.net"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition duration-300 text-lg font-semibold shadow-md"
                        >
                            {t('contact.form.contactus')}
                        </a>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{t('contact.map.title')}</h2>
                    <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.5733183839283!2d29.39089507596042!3d40.84350257137707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadc1a8d6c8e7f%3A0x681d891e5d2e31f0!2sAkse%2C%20471.%20Sk.%20No%3A8%2C%2041420%20%C3%87ay%C4%B1rova%2FKocaeli!5e0!3m2!1str!2str!4v1718458825673!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
