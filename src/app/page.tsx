'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from '@/app/components/navbar';
import Footer from "./components/footer";
import { useLanguage } from "./context/LanguageContext";
import { useRouter } from 'next/navigation';
import { db } from '../../firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react';

const certificates = [
  {
    name: 'ADASU Makine Çevre İzin Belgesi.pdf',
    path: '/certificates/ADASU Makine Çevre İzin Belgesi.pdf',
  },
  {
    name: 'EU_Declaration_of_Conformity_Çeker ocak.pdf',
    path: '/certificates/EU_Declaration_of_Conformity_Çeker ocak.pdf',
  },
  {
    name: 'EU_Declaration_of_Conformity_GALLIUM 68 & LUTESYUM 177 ÇALIŞMA KABİNİ.pdf',
    path: '/certificates/EU_Declaration_of_Conformity_GALLIUM 68 & LUTESYUM 177 ÇALIŞMA KABİNİ.pdf',
  },
  {
    name: 'EU_Declaration_of_Conformity_Kuru Isıtıcı.pdf',
    path: '/certificates/EU_Declaration_of_Conformity_Kuru Isıtıcı.pdf',
  },
  {
    name: 'MARKA TESCİL BELGESİ 1.pdf',
    path: '/certificates/MARKA TESCİL BELGESİ 1.pdf',
  },
  {
    name: 'TS EN 12588 BELGESİ.JPG',
    path: '/certificates/TS EN 12588 BELGESİ.JPG',
  },
  {
    name: 'UN2915.jpg',
    path: '/certificates/UN2915.jpg',
  },
  {
    name: 'yerli malı belgesi.pdf',
    path: '/certificates/yerli malı belgesi.pdf',
  },
];

export function CertificatesPage() {
  const { t, language } = useLanguage();
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Belgeler ve Sertifikalar</h1>
      <div className="max-w-2xl mx-auto">
        <ul className="space-y-4">
          {certificates.map((cert) => (
            <li key={cert.name} className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow">
              <span className="truncate font-medium">{cert.name}</span>
              <a
                href={cert.path}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                İndir / Görüntüle
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Anasayfa() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [productsAnimationClass, setProductsAnimationClass] = useState("opacity-0 -translate-y-4");
  const [servicesAnimationClass, setServicesAnimationClass] = useState("opacity-0 -translate-y-4");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductSelect, setShowProductSelect] = useState(false);

  // Title translations
  const searchTitle = language === 'en'
    ? 'Our innovative radiation protection solutions'
    : 'Yenilikçi radyasyon koruma çözümlerimiz';

  // Video section title
  const videoTitle = language === 'en'
    ? 'Discover Our Solutions'
    : 'Çözümlerimizi Keşfedin';

  // Video section subtitle
  const videoSubtitle = language === 'en'
    ? 'Watch our latest video to learn more about our radiation protection solutions'
    : 'Radyasyon koruma çözümlerimiz hakkında daha fazla bilgi edinmek için videomuzu izleyin';

  // Categories from navbar
  const categories = language === 'en'
    ? [
      { id: 'PHARMACEUTICAL PRODUCTION FACILITIES', name: 'PHARMACEUTICAL PRODUCTION FACILITIES' },
      { id: 'NUCLEAR MEDICINE', name: 'NUCLEAR MEDICINE' },
      { id: 'RADIOLOGY', name: 'RADIOLOGY' },
      { id: 'RADIOTHERAPY', name: 'RADIOTHERAPY' },
      { id: 'NON-DESTRUCTIVE TESTING', name: 'NON-DESTRUCTIVE TESTING' },
      { id: 'NUCLEAR RESEARCH FACILITIES', name: 'NUCLEAR RESEARCH FACILITIES' },
      { id: 'CONSTRUCTION', name: 'CONSTRUCTION' },
      { id: 'MARINE', name: 'MARINE' },
      { id: 'METAL AND MINING', name: 'METAL AND MINING' },
      { id: 'R&D', name: 'R&D' },
    ]
    : [
      { id: 'RADYAFARMASÖTİK ÜRETİM TESİSLERİ', name: 'RADYAFARMASÖTİK ÜRETİM TESİSLERİ' },
      { id: 'NÜKLEER TIP', name: 'NÜKLEER TIP' },
      { id: 'RADYOLOJİ', name: 'RADYOLOJİ' },
      { id: 'RADYOTERAPİ', name: 'RADYOTERAPİ' },
      { id: 'NDT', name: 'NDT' },
      { id: 'NÜKLEER VE ARAŞTIRMA TESİSLERİ', name: 'NÜKLEER VE ARAŞTIRMA TESİSLERİ' },
      { id: 'İNŞAAT', name: 'İNŞAAT' },
      { id: 'DENİZCİLİK', name: 'DENİZCİLİK' },
      { id: 'METAL VE MADEN', name: 'METAL VE MADEN' },
      { id: 'AR-GE', name: 'AR-GE' },
    ];

  const [products, setProducts] = useState<string[]>([]);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedProduct("");
    setShowProductSelect(true);
    // Fetch products for the selected category from Firestore
    if (categoryId) {
      const docRef = doc(db, 'pages', categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.products) {
          const productsList = data.products
            .replace(/\r\n/g, '\n')
            .replace(/\\n/g, '\n')
            .split(/\n+/)
            .filter(Boolean)
            .map((p: string) => p.trim());
          setProducts(productsList);
        } else {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  };

  // Slugify for both Turkish and English
  const convertToSlug = (text: string) => {
    const turkishChars: Record<string, string> = {
      'ğ': 'g', 'Ğ': 'G', 'ü': 'u', 'Ü': 'U', 'ş': 's', 'Ş': 'S',
      'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ç': 'c', 'Ç': 'C'
    };
    return text
      .trim()
      .toLowerCase()
      .replace(/[ğĞüÜşŞıİöÖçÇ]/g, match => turkishChars[match] || match)
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const handleSearch = () => {
    if (selectedProduct) {
      router.push(`/products/${encodeURIComponent(selectedCategory)}/${convertToSlug(selectedProduct)}`);
    } else if (selectedCategory) {
      router.push(`/products/${encodeURIComponent(selectedCategory)}`);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gray-200 flex items-start justify-center pt-4 mt-20 min-h-[600px] relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/main.jpeg"
          alt="Main Background"
          fill
          className="object-cover opacity-30 pointer-events-none select-none z-0"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/30 z-10" />
        <div className="container mx-auto px-6 py-4 text-center relative z-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-tight">
              {t('home.hero.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="text-lg md:text-xl font-bold text-blue-500 mb-4">
              {t('home.hero.motto')}
            </div>
            <div className="inline-block border-2 border-blue-500 px-4 py-2 text-base font-bold text-gray-800">
              {t('home.hero.made')}
            </div>
            <div className="mt-6 max-w-6xl mx-auto">
              <div className="bg-red-600 shadow-lg rounded-2xl px-12 py-10 flex flex-col items-center justify-center mb-6 border border-red-400 w-full">
                <h2 className="text-lg md:text-xl font-bold text-white-800 mb-2 text-center w-full">{searchTitle}</h2>
                <div className="w-10 h-1 bg-red-300 rounded mb-4 mx-auto" />
                <div className="flex flex-row space-x-6 items-center justify-center w-full">
                  <select
                    className="flex-1 min-w-[160px] p-3 border border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-100 text-gray-800 font-bold uppercase text-base hover:bg-red-100 transition-colors duration-200"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="">{language === 'en' ? 'Select Category' : 'Kategori Seçin'}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {showProductSelect && (
                    <select
                      className="flex-1 min-w-[160px] p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-100 text-gray-800 font-bold uppercase text-base focus:bg-red-100 hover:bg-red-100 transition-colors duration-200"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="">{language === 'en' ? 'Select Product' : 'Ürün Seçin'}</option>
                      {products.map((product) => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  )}

                  <button
                    onClick={handleSearch}
                    disabled={!selectedCategory}
                    className={`flex items-center justify-center min-w-[140px] p-4 rounded-lg bg-red-100 font-bold uppercase border-2 transition-colors duration-200 h-[48px] text-base ${selectedCategory
                      ? 'bg-red-100 border-red-600 text-black hover:bg-red-300 hover:border-red-700 cursor-pointer'
                      : 'bg-red-100 border-gray-300 text-black cursor-not-allowed'
                      }`}
                  >
                    {language === 'en' ? 'Search' : 'Ara'}
                    <span className="ml-2 text-2xl">&#8594;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Areas of Expertise Section */}
      <div className="w-full py-12 bg-gray-100">
        <div className="container mt-12 mx-auto px-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 text-left">
            {language === 'en' ? 'OUR AREAS OF EXPERTISE' : 'UZMANLIK ALANLARIMIZ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, idx) => (
              <div key={category.id} className="relative rounded-xl overflow-hidden shadow-lg group min-h-[260px]">
                <Image
                  src={'/images/logo.png'}
                  alt={category.name}
                  fill
                  className={'object-contain bg-white group-hover:scale-105 transition-transform duration-300'}
                />
                <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-cyan-800/80' : 'bg-cyan-700/80'} flex flex-col justify-end p-6`}>
                  <h3 className="text-white text-base font-bold mb-1">{category.name}</h3>
                  <p className="text-white text-xs mb-2">
                    {/* Example subtitles for each category, you can customize further */}
                    {language === 'en' ? (
                      [
                        'Production, quality control and storage solutions for radiopharmaceuticals.',
                        'Comprehensive solutions for nuclear medicine departments and radiation protection.',
                        'Innovative radiology solutions for diagnostic imaging and patient safety.',
                        'Advanced radiotherapy room design and shielding for safe cancer treatment.',
                        'Non-destructive testing solutions for industrial applications.',
                        'Research facility shielding and nuclear safety solutions.',
                        'Radiation protection for construction and architectural projects.',
                        'Radiation safety and protection for marine applications.',
                        'Metal and mining industry radiation protection solutions.',
                        'Research and development in radiation protection technologies.'
                      ][idx]
                    ) : (
                      [
                        'Radyofarmasötiklerin üretimi, kalite kontrolü ve depolanması için çözümler.',
                        'Nükleer tıp departmanları ve radyasyon koruması için kapsamlı çözümler.',
                        'Tanısal görüntüleme ve hasta güvenliği için yenilikçi radyoloji çözümleri.',
                        'Güvenli kanser tedavisi için ileri radyoterapi oda tasarımı ve koruma.',
                        'Endüstriyel uygulamalar için tahribatsız muayene çözümleri.',
                        'Araştırma tesisleri için koruma ve nükleer güvenlik çözümleri.',
                        'İnşaat ve mimari projeler için radyasyon koruma çözümleri.',
                        'Denizcilik uygulamaları için radyasyon güvenliği ve koruma.',
                        'Metal ve maden endüstrisi için radyasyon koruma çözümleri.',
                        'Radyasyon koruma teknolojilerinde araştırma ve geliştirme.'
                      ][idx]
                    )}
                  </p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded transition-colors duration-200 w-fit cursor-pointer"
                    onClick={() => router.push(`/products/${encodeURIComponent(category.id)}`)}
                  >
                    {language === 'en' ? 'LEARN MORE' : 'DAHA FAZLA'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Video Section */}
      <div className="w-full py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              {videoTitle}
            </h2>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              {videoSubtitle}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl h-[400px]">
              <div style={{ padding: '56.25% 0 0 0', position: 'relative', width: '100%', height: '100%' }}>
                {language === 'en' ? (
                  <iframe
                    src="https://player.vimeo.com/video/1099301294?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="720p eng"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <iframe
                    src="https://player.vimeo.com/video/1099302366?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="720p tr"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Media Section */}
      <div className="w-full py-12 bg-white mt-12 shadow-lg rounded-t-2xl">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center tracking-tight">{t('media.title')}</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">{t('media.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* CNR Expomed Card */}
            <div className="group bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col hover:scale-[1.02] transition-transform duration-200 overflow-hidden">
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36.jpeg" alt="CNR Expomed 2024" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors">{t('media.cnrexpomed.title')}</h3>
                <p className="text-gray-700 mb-4 flex-1 text-base">{t('media.cnrexpomed.desc')}</p>
                <div className="flex gap-3 mb-6">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                    <Image src="/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (1).jpeg" alt="CNR Expomed 2024 2" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                    <Image src="/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (2).jpeg" alt="CNR Expomed 2024 3" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <button
                  className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg shadow transition self-end text-base tracking-wide group-hover:scale-105 group-active:scale-95 cursor-pointer"
                  onClick={() => router.push('/media/cnrexpomed')}
                >
                  {t('media.readmore')}
                </button>
              </div>
            </div>
            {/* Kıbrıs Kongre Card */}
            <div className="group bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col hover:scale-[1.02] transition-transform duration-200 overflow-hidden">
              <div className="relative w-full h-40 overflow-hidden">
                <Image src="/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35.jpeg" alt="2024 Kıbrıs Nükleer Tıp Kongresi" fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors">{t('media.kibriskongre.title')}</h3>
                <p className="text-gray-700 mb-4 flex-1 text-base">{t('media.kibriskongre.desc')}</p>
                <div className="flex gap-3 mb-6">
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                    <Image src="/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35 (1).jpeg" alt="Kıbrıs Kongre 2024 2" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition">
                    <Image src="/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.36.jpeg" alt="Kıbrıs Kongre 2024 3" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <button
                  className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg shadow transition self-end text-base tracking-wide group-hover:scale-105 group-active:scale-95 cursor-pointer"
                  onClick={() => router.push('/media/kibriskongre')}
                >
                  {t('media.readmore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Certificates Preview Section */}
      <div className="w-full py-12 bg-blue-50">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">{language === 'en' ? 'Certificates' : 'Belgeler'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
            {[
              {
                path: '/certificates/TS EN 12588 BELGESİ.JPG',
                name: 'TS EN 12588',
                explanation: {
                  tr: 'Kurşun levha standardı belgesi',
                  en: 'Lead sheet standard certificate',
                },
                icon: (
                  <svg className="w-14 h-14 mb-3 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="12" fill="#F37021" />
                    <rect x="18" y="16" width="28" height="32" rx="4" fill="#fff" />
                    <rect x="22" y="24" width="20" height="2.5" rx="1.25" fill="#F37021" />
                    <rect x="22" y="30" width="20" height="2.5" rx="1.25" fill="#F37021" />
                    <rect x="22" y="36" width="12" height="2.5" rx="1.25" fill="#F37021" />
                  </svg>
                ),
              },
              {
                path: '/certificates/UN2915.jpg',
                name: 'UN2915',
                explanation: {
                  tr: 'Radyoaktif madde taşımacılığı uygunluk belgesi',
                  en: 'Certificate for radioactive material transport compliance',
                },
                icon: (
                  <svg className="w-14 h-14 mb-3 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="12" fill="#F37021" />
                    <rect x="16" y="24" width="32" height="16" rx="4" fill="#fff" />
                    <rect x="20" y="28" width="24" height="8" rx="2" fill="#F37021" />
                    <rect x="28" y="36" width="8" height="4" rx="2" fill="#F37021" />
                  </svg>
                ),
              },
              // AB Uygunluk Beyanı
              {
                path: '/certificates/EU_Declaration_of_Conformity_Çeker ocak.pdf',
                name: t('certificate.abdeclaration'),
                explanation: {
                  tr: t('certificate.abdeclaration.explanation'),
                  en: t('certificate.abdeclaration.explanation'),
                },
                icon: (
                  <svg className="w-14 h-14 mb-3 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="12" fill="#F37021" />
                    <circle cx="32" cy="32" r="16" fill="#fff" />
                    <rect x="24" y="28" width="16" height="8" rx="2" fill="#F37021" />
                  </svg>
                ),
              },
              // Marka Tescil Belgesi
              {
                path: '/certificates/MARKA TESCİL BELGESİ 1.pdf',
                name: t('certificate.trademark'),
                explanation: {
                  tr: t('certificate.trademark.explanation'),
                  en: t('certificate.trademark.explanation'),
                },
                icon: (
                  <svg className="w-14 h-14 mb-3 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="12" fill="#F37021" />
                    <rect x="20" y="20" width="24" height="24" rx="6" fill="#fff" />
                    <text x="32" y="40" textAnchor="middle" fontSize="18" fill="#F37021" fontFamily="Arial" fontWeight="bold">®</text>
                  </svg>
                ),
              },
            ].map((cert) => (
              <div key={cert.path} className="flex flex-col items-center justify-start bg-white border border-blue-200 rounded-xl p-6 shadow text-center h-full">
                <div className="mb-3 flex items-center justify-center w-full">
                  {cert.icon}
                </div>
                <span className="block font-medium text-lg text-gray-800 w-full mb-0">
                  {cert.name}
                </span>
                <span className="block text-sm text-gray-500 mt-1">
                  {language === 'en' ? cert.explanation.en : cert.explanation.tr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* World Map Section */}
      <div className="w-full py-12 bg-blue-25">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-8">
            {t('home.map.title')}
          </h2>
          <div className="relative w-full h-[400px] mb-8">
            <Image
              src="/images/world_map.jpg"
              alt="Dünya Haritası"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'country.france',
              'country.canada',
              'country.saudi',
              'country.jordan',
              'country.georgia',
              'country.azerbaijan',
              'country.algeria',
              'country.iraq',
              'country.kosovo',
              'country.macedonia',
              'country.libya'
            ].map((countryKey, index) => (
              <div
                key={index}
                className="bg-white border-2 border-blue-500 px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-center"
              >
                <span className="text-blue-600 font-bold text-xl">{t(countryKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}