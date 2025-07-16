'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

// Define interfaces for dropdown props
interface DropdownProps {
    isOpen: boolean;
    animationClass: string;
    onMouseLeave: () => void;
    onProductClick: (productName: string) => void;
}

// Dropdown menu component for Products
const ProductsDropdown = ({ isOpen, animationClass, onMouseLeave, onProductClick }: DropdownProps) => {
    const { t, language } = useLanguage();

    // Product names in Turkish and English
    const productNames = {
        tr: [
            'RADYAFARMASÖTİK ÜRETİM TESİSLERİ',
            'NÜKLEER TIP',
            'RADYOLOJİ',
            'RADYOTERAPİ',
            'NDT',
            'NÜKLEER VE ARAŞTIRMA TESİSLERİ',
            'İNŞAAT',
            'DENİZCİLİK',
            'METAL VE MADEN',
            'AR-GE'
        ],
        en: [
            'PHARMACEUTICAL PRODUCTION FACILITIES',
            'NUCLEAR MEDICINE',
            'RADIOLOGY',
            'RADIOTHERAPY',
            'NON-DESTRUCTIVE TESTING',
            'NUCLEAR RESEARCH FACILITIES',
            'CONSTRUCTION',
            'MARINE',
            'METAL AND MINING',
            'R&D'
        ]
    };

    // Select the appropriate product names based on the current language
    const productsToDisplay = language === 'en' ? productNames.en : productNames.tr;

    return (
        <div
            className={`fixed top-14 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-2 py-4 flex">
                <div className="w-2/3 pl-4 border-l border-gray-200">
                    <div className="grid grid-cols-1 gap-1">
                        {productsToDisplay.map((product, index) => (
                            <a
                                key={product}
                                onClick={() => onProductClick(product)}
                                className="flex items-center py-2 text-gray-800 hover:text-blue-500 transition-colors font-light text-xs cursor-pointer"
                            >
                                <span>{product}</span>
                                <svg className="ml-2 w-6 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Dropdown menu component for Services
const ServicesDropdown = ({ isOpen, animationClass, onMouseLeave, onProductClick }: DropdownProps) => {
    const { t, language } = useLanguage();

    // Service names in Turkish and English
    const serviceNames = {
        tr: [
            'NDK PROJE DESTEĞİ',
            'NDK ÖN LİSANS DESTEĞİ',
            'NÜKLEER TIP PROJELENDİRME',
            'RADYOLOJİ PROJELENDİRME',
            'RADYOTERAPİ PROJELENDİRME',
            'MİMARİ TASARIM'
        ],
        en: [
            'NDK PROJECT SUPPORT',
            'NDK PRE-LICENSE SUPPORT',
            'NUCLEAR MEDICINE DESIGNING',
            'RADIOLOGY DESIGNING',
            'RADIOTHERAPY DESIGNING',
            'ARCHITECTURAL DESIGN'
        ]
    };

    // Select the appropriate service names based on the current language
    const servicesToDisplay = language === 'en' ? serviceNames.en : serviceNames.tr;

    return (
        <div
            className={`fixed top-14 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-2 py-4 flex">
                <div className="w-2/3 pl-4 border-l border-gray-200">
                    <div className="grid grid-cols-1 gap-1">
                        {servicesToDisplay.map((service, index) => (
                            <div
                                key={service}
                                className="flex items-center py-2 text-gray-600 font-light text-xs"
                            >
                                <span>{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [productsAnimationClass, setProductsAnimationClass] = useState("opacity-0 -translate-y-4");
    const [servicesAnimationClass, setServicesAnimationClass] = useState("opacity-0 -translate-y-4");
    const [languageAnimationClass, setLanguageAnimationClass] = useState("opacity-0 -translate-y-4");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    useEffect(() => {
        if (isProductsOpen) {
            setProductsAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setProductsAnimationClass("opacity-100 translate-y-0");
            }, 50);
        } else {
            setProductsAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setIsProductsOpen(false);
            }, 300); // Match this duration with your CSS transition duration
        }
    }, [isProductsOpen]);

    useEffect(() => {
        if (isServicesOpen) {
            setServicesAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setServicesAnimationClass("opacity-100 translate-y-0");
            }, 50);
        } else {
            setServicesAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setIsServicesOpen(false);
            }, 300); // Match this duration with your CSS transition duration
        }
    }, [isServicesOpen]);

    useEffect(() => {
        if (isLanguageOpen) {
            setLanguageAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setLanguageAnimationClass("opacity-100 translate-y-0");
            }, 50);
        } else {
            setLanguageAnimationClass("opacity-0 -translate-y-4");
            setTimeout(() => {
                setIsLanguageOpen(false);
            }, 300); // Match this duration with your CSS transition duration
        }
    }, [isLanguageOpen]);

    const handleLanguageChange = (lang: 'tr' | 'en') => {
        setLanguage(lang);
        setIsLanguageOpen(false);
    };

    const handleProductClick = (productName: string) => {
        setIsProductsOpen(false);
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileProductsOpen(false);
        setIsMobileServicesOpen(false);
        router.push(`/products/${encodeURIComponent(productName)}`);
    };

    // Product and service names for mobile
    const productNames = language === 'en'
        ? [
            'PHARMACEUTICAL PRODUCTION FACILITIES',
            'NUCLEAR MEDICINE',
            'RADIOLOGY',
            'RADIOTHERAPY',
            'NON-DESTRUCTIVE TESTING',
            'NUCLEAR RESEARCH FACILITIES',
            'CONSTRUCTION',
            'MARINE',
            'METAL AND MINING',
            'R&D',
        ]
        : [
            'RADYAFARMASÖTİK ÜRETİM TESİSLERİ',
            'NÜKLEER TIP',
            'RADYOLOJİ',
            'RADYOTERAPİ',
            'NDT',
            'NÜKLEER VE ARAŞTIRMA TESİSLERİ',
            'İNŞAAT',
            'DENİZCİLİK',
            'METAL VE MADEN',
            'AR-GE',
        ];
    const serviceNames = language === 'en'
        ? [
            'NDK PROJECT SUPPORT',
            'NDK PRE-LICENSE SUPPORT',
            'NUCLEAR MEDICINE DESIGNING',
            'RADIOLOGY DESIGNING',
            'RADIOTHERAPY DESIGNING',
            'ARCHITECTURAL DESIGN',
        ]
        : [
            'NDK PROJE DESTEĞİ',
            'NDK ÖN LİSANS DESTEĞİ',
            'NÜKLEER TIP PROJELENDİRME',
            'RADYOLOJİ PROJELENDİRME',
            'RADYOTERAPİ PROJELENDİRME',
            'MİMARİ TASARIM',
        ];

    return (
        <header className="w-full">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-md">
                <div className="w-full mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <div className="flex items-center pl-2">
                            <Link href="/">
                                <Image
                                    src="/images/logo.png"
                                    alt="Adasu Logo"
                                    width={110}
                                    height={45}
                                    className="cursor-pointer"
                                    priority
                                />
                            </Link>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                className="text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer"
                                aria-label="Open menu"
                                onClick={() => setIsMobileMenuOpen((v) => !v)}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center pr-4">
                            {/* Products dropdown */}
                            <div className="relative flex items-center">
                                <a
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsProductsOpen(true);
                                        setIsServicesOpen(false);
                                    }}
                                >
                                    {t('nav.products')}
                                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                                <span className="mx-1 text-blue-600 text-lg font-light select-none">/</span>
                            </div>
                            <div className="relative flex items-center">
                                <a
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsServicesOpen(true);
                                        setIsProductsOpen(false);
                                    }}
                                >
                                    {t('nav.services')}
                                    <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                                <span className="mx-1 text-blue-600 text-lg font-light select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={language === 'en' ? '/about' : '/about'}
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold cursor-pointer"
                                    prefetch={false}
                                >
                                    {t('nav.about')}
                                </Link>
                                <span className="mx-1 text-blue-600 text-lg font-light select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={language === 'en' ? '/contact' : '/contact'}
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold cursor-pointer"
                                    prefetch={false}
                                >
                                    {t('nav.contact')}
                                </Link>
                                <span className="mx-1 text-blue-600 text-lg font-light select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href="/media"
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold cursor-pointer"
                                    prefetch={false}
                                >
                                    {t('nav.media')}
                                </Link>
                                <span className="mx-1 text-blue-600 text-lg font-light select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href="/certificates"
                                    className="text-xs text-gray-700 hover:text-blue-500 font-bold cursor-pointer"
                                    prefetch={false}
                                >
                                    {t('nav.documents')}
                                </Link>
                            </div>
                            {/* Language selector */}
                            <div className="flex items-center ml-2 gap-1">
                                <button
                                    onClick={() => handleLanguageChange('tr')}
                                    className={`p-1 rounded transition-opacity ${language === 'tr' ? 'ring-2 ring-blue-500 bg-blue-100' : 'opacity-70 hover:opacity-100'}`}
                                    aria-label="Türkçe"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
                                        <mask id="tr"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                        <g mask="url(#tr)"><path fill="#d80027" d="M0 0h512v512H0z" /><g fill="#f0f0f0"><path d="M245.5 209.2l21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11.1z" /><path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" /></g></g>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleLanguageChange('en')}
                                    className={`p-1 rounded transition-opacity ${language === 'en' ? 'ring-2 ring-blue-500 bg-blue-100' : 'opacity-70 hover:opacity-100'}`}
                                    aria-label="English"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
                                        <mask id="en"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                        <g mask="url(#en)"><path fill="#f0f0f0" d="M0 0h512v512H0z" /><path fill="#0052b4" d="M0 0h512v512H0z" /><path fill="#f0f0f0" d="M0 0L512 512M512 0L0 512" stroke="#f0f0f0" strokeWidth="74" /><path fill="#f0f0f0" d="M256 0v512M0 256h512" stroke="#f0f0f0" strokeWidth="102" /><path fill="#d80027" d="M0 0L512 512M512 0L0 512" stroke="#d80027" strokeWidth="26" /><path fill="#d80027" d="M256 0v512M0 256h512" stroke="#d80027" strokeWidth="54" /></g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}
            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ willChange: 'transform' }}
            >
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image src="/images/logo.png" alt="Adasu Logo" width={80} height={40} className="cursor-pointer" />
                        </Link>
                        <button
                            className="text-gray-700 hover:text-blue-500 focus:outline-none cursor-pointer"
                            aria-label="Close menu"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {/* Products Dropdown */}
                        <button
                            className="flex items-center justify-between text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer w-full"
                            onClick={() => setIsMobileProductsOpen((v) => !v)}
                        >
                            {t('nav.products')}
                            <svg className={`ml-2 w-3 h-3 transform transition-transform ${isMobileProductsOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isMobileProductsOpen && (
                            <div className="pl-3 flex flex-col gap-1 mb-2">
                                {productNames.map((product) => (
                                    <button
                                        key={product}
                                        className="text-gray-700 hover:text-blue-500 text-[10px] py-1 text-left cursor-pointer font-light"
                                        onClick={() => handleProductClick(product)}
                                    >
                                        {product}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Services Dropdown */}
                        <button
                            className="flex items-center justify-between text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer w-full"
                            onClick={() => setIsMobileServicesOpen((v) => !v)}
                        >
                            {t('nav.services')}
                            <svg className={`ml-2 w-3 h-3 transform transition-transform ${isMobileServicesOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isMobileServicesOpen && (
                            <div className="pl-3 flex flex-col gap-1 mb-2">
                                {serviceNames.map((service) => (
                                    <div key={service} className="text-gray-700 text-[10px] py-1 font-light">
                                        {service}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Link
                            href={language === 'en' ? '/en/about' : '/about'}
                            className="text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav.about')}
                        </Link>
                        <Link
                            href={language === 'en' ? '/en/contact' : '/contact'}
                            className="text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </Link>
                        <Link
                            href="/media"
                            className="text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav.media')}
                        </Link>
                        <Link
                            href="/certificates"
                            className="text-xs text-gray-700 hover:text-blue-500 font-bold py-2 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t('nav.documents')}
                        </Link>
                        {/* Language Switcher */}
                        <div className="flex items-center mt-3 gap-2">
                            <button
                                onClick={() => { handleLanguageChange('tr'); setIsMobileMenuOpen(false); }}
                                className={`p-1 rounded transition-opacity ${language === 'tr' ? 'ring-2 ring-blue-500 bg-blue-100' : 'opacity-70 hover:opacity-100'}`}
                                aria-label="Türkçe"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
                                    <mask id="trm"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                    <g mask="url(#trm)"><path fill="#d80027" d="M0 0h512v512H0z" /><g fill="#f0f0f0"><path d="M245.5 209.2l21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11.1z" /><path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" /></g></g>
                                </svg>
                            </button>
                            <button
                                onClick={() => { handleLanguageChange('en'); setIsMobileMenuOpen(false); }}
                                className={`p-1 rounded transition-opacity ${language === 'en' ? 'ring-2 ring-blue-500 bg-blue-100' : 'opacity-70 hover:opacity-100'}`}
                                aria-label="English"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
                                    <mask id="enm"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
                                    <g mask="url(#enm)"><path fill="#f0f0f0" d="M0 0h512v512H0z" /><path fill="#0052b4" d="M0 0h512v512H0z" /><path fill="#f0f0f0" d="M0 0L512 512M512 0L0 512" stroke="#f0f0f0" strokeWidth="74" /><path fill="#f0f0f0" d="M256 0v512M0 256h512" stroke="#f0f0f0" strokeWidth="102" /><path fill="#d80027" d="M0 0L512 512M512 0L0 512" stroke="#d80027" strokeWidth="26" /><path fill="#d80027" d="M256 0v512M0 256h512" stroke="#d80027" strokeWidth="54" /></g>
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Dropdown menus for desktop */}
            <ProductsDropdown
                isOpen={isProductsOpen}
                animationClass={productsAnimationClass}
                onMouseLeave={() => setIsProductsOpen(false)}
                onProductClick={handleProductClick}
            />
            <ServicesDropdown
                isOpen={isServicesOpen}
                animationClass={servicesAnimationClass}
                onMouseLeave={() => setIsServicesOpen(false)}
                onProductClick={handleProductClick}
            />
        </header>
    );
}