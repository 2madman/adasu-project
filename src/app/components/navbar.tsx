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
            className={`fixed top-20 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-2 py-4 flex">
                <div className="w-2/3 pl-4 border-l border-gray-200">
                    <div className="grid grid-cols-1 gap-1">
                        {productsToDisplay.map((product, index) => (
                            <a
                                key={product}
                                onClick={() => onProductClick(product)}
                                className="flex items-center py-2 text-gray-800 hover:text-blue-500 transition-colors font-semibold text-base cursor-pointer"
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
            className={`fixed top-20 left-0 right-0 bg-white/95 shadow-lg z-40 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass}`}
            onMouseLeave={onMouseLeave}
        >
            <div className="container mx-auto px-2 py-4 flex">
                <div className="w-2/3 pl-4 border-l border-gray-200">
                    <div className="grid grid-cols-1 gap-1">
                        {servicesToDisplay.map((service, index) => (
                            <div
                                key={service}
                                className="flex items-center py-2 text-gray-600 font-semibold text-base"
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

// Language dropdown menu component
interface LanguageDropdownProps {
    isOpen: boolean;
    animationClass: string;
    onMouseLeave: () => void;
    onLanguageChange: (lang: 'tr' | 'en') => void;
    currentLanguage: 'tr' | 'en';
}

const LanguageDropdown = ({ isOpen, animationClass, onMouseLeave, onLanguageChange, currentLanguage }: LanguageDropdownProps) => (
    <div
        className={`absolute top-16 right-0 bg-white/95 shadow-lg z-50 h-auto transition-all duration-300 ease-in-out transform ${isOpen ? 'block' : 'hidden'} ${animationClass} rounded-md`}
        onMouseLeave={onMouseLeave}
    >
        <div className="py-2 px-4">
            {currentLanguage === 'en' ? (
                <button
                    onClick={() => onLanguageChange('tr')}
                    className="flex items-center py-2 hover:opacity-80 transition-opacity"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        className="mr-2"
                    >
                        <mask id="a">
                            <circle cx="256" cy="256" r="256" fill="#fff" />
                        </mask>
                        <g mask="url(#a)">
                            <path fill="#d80027" d="M0 0h512v512H0z" />
                            <g fill="#f0f0f0">
                                <path d="M245.5 209.2l21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11.1z" />
                                <path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" />
                            </g>
                        </g>
                    </svg>
                    <span className="ml-2 text-sm font-bold text-gray-800">Türkçe</span>
                </button>
            ) : (
                <button
                    onClick={() => onLanguageChange('en')}
                    className="flex items-center py-2 hover:opacity-80 transition-opacity"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        className="mr-2"
                    >
                        <mask id="b">
                            <circle cx="256" cy="256" r="256" fill="#fff" />
                        </mask>
                        <g mask="url(#b)">
                            <path fill="#f0f0f0" d="M0 0h512v512H0z" />
                            <path fill="#0052b4" d="M0 0h512v512H0z" />
                            <path fill="#f0f0f0" d="M0 0L512 512M512 0L0 512" stroke="#f0f0f0" stroke-width="74" />
                            <path fill="#f0f0f0" d="M256 0v512M0 256h512" stroke="#f0f0f0" stroke-width="102" />
                            <path fill="#d80027" d="M0 0L512 512M512 0L0 512" stroke="#d80027" stroke-width="26" />
                            <path fill="#d80027" d="M256 0v512M0 256h512" stroke="#d80027" stroke-width="54" />
                        </g>
                    </svg>
                    <span className="ml-2 text-sm font-bold text-gray-800">English</span>
                </button>
            )}
        </div>
    </div>
);

export default function Navbar() {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [productsAnimationClass, setProductsAnimationClass] = useState("opacity-0 -translate-y-4");
    const [servicesAnimationClass, setServicesAnimationClass] = useState("opacity-0 -translate-y-4");
    const [languageAnimationClass, setLanguageAnimationClass] = useState("opacity-0 -translate-y-4");

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
        // Close dropdowns
        setIsProductsOpen(false);
        setIsServicesOpen(false);

        // Always use /products path regardless of language
        router.push(`/products/${encodeURIComponent(productName)}`);
    };

    return (
        <header className="w-full">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-md">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center pl-4">
                            <Link href="/">
                                <Image
                                    src="/images/logo.png"
                                    alt="Adasu Logo"
                                    width={180}
                                    height={80}
                                    className="cursor-pointer"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-gray-700 hover:text-blue-500 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center pr-8">
                            {/* Products dropdown */}
                            <div className="relative flex items-center">
                                <a
                                    href="#"
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsProductsOpen(true);
                                        setIsServicesOpen(false);
                                    }}
                                >
                                    {t('nav.products')}
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                                <span className="mx-2 text-blue-600 text-xl font-bold select-none">/</span>
                            </div>
                            <div className="relative flex items-center">
                                <a
                                    href="#"
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold flex items-center"
                                    onMouseEnter={() => {
                                        setIsServicesOpen(true);
                                        setIsProductsOpen(false);
                                    }}
                                >
                                    {t('nav.services')}
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </a>
                                <span className="mx-2 text-blue-600 text-xl font-bold select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={language === 'en' ? '/en/about' : '/about'}
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold"
                                    prefetch={false}
                                >
                                    {t('nav.about')}
                                </Link>
                                <span className="mx-2 text-blue-600 text-xl font-bold select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={language === 'en' ? '/en/contact' : '/contact'}
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold"
                                    prefetch={false}
                                >
                                    {t('nav.contact')}
                                </Link>
                                <span className="mx-2 text-blue-600 text-xl font-bold select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href="/media"
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold"
                                    prefetch={false}
                                >
                                    {t('nav.media')}
                                </Link>
                                <span className="mx-2 text-blue-600 text-xl font-bold select-none">/</span>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={language === 'en' ? '/en/certificates' : '/certificates'}
                                    className="text-base text-gray-700 hover:text-blue-500 font-bold"
                                    prefetch={false}
                                >
                                    {t('nav.documents')}
                                </Link>
                            </div>
                            {/* Language selector */}
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    {language === 'en' ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 512 512"
                                            className="hover:opacity-80"
                                        >
                                            <mask id="c">
                                                <circle cx="256" cy="256" r="256" fill="#fff" />
                                            </mask>
                                            <g mask="url(#c)">
                                                <path fill="#f0f0f0" d="M0 0h512v512H0z" />
                                                <path fill="#0052b4" d="M0 0h512v512H0z" />
                                                <path fill="#f0f0f0" d="M0 0L512 512M512 0L0 512" stroke="#f0f0f0" stroke-width="74" />
                                                <path fill="#f0f0f0" d="M256 0v512M0 256h512" stroke="#f0f0f0" stroke-width="102" />
                                                <path fill="#d80027" d="M0 0L512 512M512 0L0 512" stroke="#d80027" stroke-width="26" />
                                                <path fill="#d80027" d="M256 0v512M0 256h512" stroke="#d80027" stroke-width="54" />
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="36"
                                            height="36"
                                            viewBox="0 0 512 512"
                                            className="hover:opacity-80"
                                        >
                                            <mask id="a">
                                                <circle cx="256" cy="256" r="256" fill="#fff" />
                                            </mask>
                                            <g mask="url(#a)">
                                                <path fill="#d80027" d="M0 0h512v512H0z" />
                                                <g fill="#f0f0f0">
                                                    <path d="M245.5 209.2l21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11.1z" />
                                                    <path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" />
                                                </g>
                                            </g>
                                        </svg>
                                    )}
                                </button>

                                {/* Language dropdown */}
                                <LanguageDropdown
                                    isOpen={isLanguageOpen}
                                    animationClass={languageAnimationClass}
                                    onMouseLeave={() => setIsLanguageOpen(false)}
                                    onLanguageChange={handleLanguageChange}
                                    currentLanguage={language}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dropdown menus */}
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