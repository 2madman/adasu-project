'use client';

import React from 'react';
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

// Add translations to the language context
import { translations } from '../context/LanguageContext';

// Extend translations with footer specific texts
Object.assign(translations, {
    'footer.contact': {
        tr: 'İletişim Bilgileri',
        en: 'Contact Information',
    },
    'footer.about': {
        tr: 'Hakkımızda',
        en: 'About Us',
    },
    'footer.about.text': {
        tr: 'Kaliteli hizmet ve müşteri memnuniyeti odaklı çalışmalarımızla sektörde öncü konumdayız.',
        en: 'We are a leader in the industry with our quality service and customer satisfaction-focused work.',
    },
    'footer.contact.button': {
        tr: 'Bize Ulaşın',
        en: 'Contact Us',
    },
    'footer.copyright': {
        tr: 'Tüm hakları saklıdır.',
        en: 'All rights reserved.',
    },
});

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="mt-1 mr-3 text-blue-400">
                                    <FaMapMarkerAlt size={16} />
                                </div>
                                <p>AKSE MAHALLESİ 471.SOKAK NO:8 ÇAYIROVA /GEBZE / KOCAELİ</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaWhatsapp size={16} />
                                </div>
                                <a
                                    href="https://wa.me/905547810379"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-blue-200 text-white"
                                    title="WhatsApp ile iletişime geçin"
                                >
                                    0554 781 03 79
                                </a>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaPhone size={16} />
                                </div>
                                <p>0262 643 91 96 - 0262 742 01 00</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaFax size={16} />
                                </div>
                                <p>0262 643 78 73</p>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-3 text-blue-400">
                                    <FaEnvelope size={16} />
                                </div>
                                <a href="mailto:info@adarad.net" className="hover:underline text-blue-200">info@adarad.net</a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
                        <p className="mb-4">
                            {t('footer.about.text')}
                        </p>
                        <div className="mt-6">
                            <a
                                href="mailto:info@adarad.net"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                            >
                                {t('footer.contact.button')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} ADARAD. {t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;