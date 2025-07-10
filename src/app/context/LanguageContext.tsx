'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'tr' | 'en';

// Define translations type
export type TranslationsType = {
  [key: string]: {
    tr: string;
    en: string;
  };
};

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: TranslationsType;
};

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
export const translations: TranslationsType = {
  // Navbar
  'nav.products': {
    tr: 'ÜRÜNLER',
    en: 'PRODUCTS',
  },
  'nav.services': {
    tr: 'HİZMETLER',
    en: 'SERVICES',
  },
  'nav.about': {
    tr: 'HAKKIMIZDA',
    en: 'ABOUT US',
  },
  'nav.contact': {
    tr: 'İLETİŞİM',
    en: 'CONTACT',
  },
  'nav.media': {
    tr: 'MEDYA',
    en: 'MEDIA',
  },
  'nav.documents': {
    tr: 'BELGELER ve SERTİFİKALAR',
    en: 'DOCUMENTS & CERTIFICATES',
  },
  // Homepage
  'home.hero.title': {
    tr: 'Nükleer Tıp, Araştırma, Endüstri ve Nükleer güvenlik alanları için radyasyon koruma çözümleri geliştiriyor, tasarlıyor ve üretiyoruz.',
    en: 'We develop, design and manufacture radiation protection solutions for the fields of Nuclear Medicine, Research, Industry and Nuclear Protection.',
  },
  'home.hero.subtitle': {
    tr: '20 yılı aşkın deneyime dayanan bu zorlu meslekte kapsamlı uzmanlığa sahibiz.',
    en: 'We have extensive expertise in this challenging profession based on more than 20 years of experience.',
  },
  'home.hero.motto': {
    tr: '"TASARLA, ÜRET, UYGULA"',
    en: '"DESIGN, PRODUCE, APPLY"',
  },
  'home.hero.made': {
    tr: '%100 Yerli Mühendislik ve Üretim',
    en: '100% Made In Turkey',
  },
  'home.map.title': {
    tr: 'İhracat Yaptığımız Ülkeler',
    en: 'Countries We Export To',
  },
  // About Page
  'about.title': {
    tr: 'Hakkımızda',
    en: 'About Us',
  },
  'about.nuclear.title': {
    tr: 'Nükleer ve radyasyon',
    en: 'Nuclear and Radiation',
  },
  'about.nuclear.p1': {
    tr: 'Tıp, Araştırma, Endüstri ve Nükleer güvenlik alanları için radyasyon koruma çözümleri geliştiriyor, tasarlıyor ve üretiyoruz. 20 yılı aşkın deneyimine dayanan bu zorlu meslekte kapsamlı uzmanlığa sahibiz. Korumak için uzman bilgisine ihtiyacınız var, bu yüzden 20 yılı aşkın süredir sürekli olarak yenilik yapıyor, araştırıyor, tasarlıyor ve en iyi çözümleri üretiyoruz, ayrıca ürünlerimizi ve hizmetlerimizi kuruyor, dağıtıyor ve kullanıcıları eğitiyoruz.',
    en: 'Ada Group is a designer and manufacturer of radiation protection solutions based in Turkey. As a global innovation leader in radiation protection, we are the driving force of an innovative and sustainable economy in Turkey. Our top priority is to use our expertise for people and the environment.',
  },
  'about.nuclear.p2': {
    tr: 'En büyük önceliğimiz: mükemmellik. Hayatı, doktorların ve mühendislerin, teknisyenlerin ve araştırmacıların hayatlarını ve sizin hayatınızı korumak için mükemmellik istiyoruz.',
    en: 'We develop, design and manufacture radiation protection solutions for the fields of Medicine, Research, Industry and Nuclear safety. We have extensive expertise in this challenging profession, based on over 20 years of experience.',
  },
  'about.nuclear.p3': {
    tr: 'Ada grup, Türkiye merkezli radyasyon koruma çözümleri tasarımcısı ve üreticisidir. Radyasyon koruması alanında küresel bir inovasyon lideri olarak, Türkiyede yenilikçi ve sürdürülebilir ekonominin itici gücüyüz. En büyük önceliğimiz uzmanlığımızı insanlar ve çevre için kullanmak.',
    en: 'Our top priority: excellence. We demand excellence to protect life, the lives of doctors and engineers, technicians and researchers, and your life.',
  },
  'about.maritime.title': {
    tr: 'Denizcilik',
    en: 'Maritime',
  },
  'about.maritime.p1': {
    tr: 'Deniz hayranları, Tekne, yat üreticileri ve sahipleri ! Ada grup kuvvetli rüzgarlara teknenizi su üstünde tutmak ve denge sağlamak için her zaman yanınızda, bunun için özel kurşun ağırlıklar üretiyoruz.',
    en: 'Sea fans, Boat, yacht manufacturers and owners! We are always with you to keep your boat afloat and balanced against strong winds in the island group, we produce special lead weights for this purpose.',
  },
  'about.construction.title': {
    tr: 'İnşaat',
    en: 'Construction',
  },
  'about.construction.p1': {
    tr: 'Ada grup ülkemizde ve farklı coğrafyalarda oluşan doğal depremin etkilerini en aza indiren sismik izolatörlerin kurşun çekirdeklerini üreterek güvenlik anlamında sismik izolatör üreticilerini destek sağlıyoruz. Hastanelerin Nükleer tıp, radyoloji, radyoterapi ve Radyonuklid tedavi ünitelerini IAEA ve TAEK standartlarına uygun, ergonomi, estetik ve en önemlisi güvenliğe önem veren anahtar teslim mimari projeler tasarlıyor, üretiyor ve uyguluyoruz.',
    en: 'We provide support to seismic isolator manufacturers in terms of security by producing lead cores of seismic isolators that minimize the effects of natural earthquakes occurring in our island group country and in different geographies. We design, produce and implement turnkey architectural projects for hospitals nuclear medicine, radiology, radiotherapy and radionuclide treatment units in accordance with IAEA and TAEK standards, giving importance to ergonomics, aesthetics and most importantly safety.',
  },
  // Contact Page
  'contact.title': {
    tr: 'İletişim',
    en: 'Contact',
  },
  'contact.subtitle': {
    tr: 'Sorularınız veya talepleriniz için bizimle iletişime geçin',
    en: 'Contact us for your questions or requests',
  },
  'contact.info.title': {
    tr: 'İletişim Bilgilerimiz',
    en: 'Contact Information',
  },
  'contact.address.label': {
    tr: 'Adres',
    en: 'Address',
  },
  'contact.phone.label': {
    tr: 'Telefon',
    en: 'Phone',
  },
  'contact.fax.label': {
    tr: 'Faks',
    en: 'Fax',
  },
  'contact.email.label': {
    tr: 'E-posta',
    en: 'Email',
  },
  'contact.hours.title': {
    tr: 'Çalışma Saatleri',
    en: 'Working Hours',
  },
  'contact.hours.weekdays': {
    tr: 'Pazartesi - Cuma: 08:30 - 17:30',
    en: 'Monday - Friday: 08:30 - 17:30',
  },
  'contact.hours.weekend': {
    tr: 'Cumartesi - Pazar: Kapalı',
    en: 'Saturday - Sunday: Closed',
  },
  'contact.form.title': {
    tr: 'Bize Mesaj Gönderin',
    en: 'Send Us a Message',
  },
  'contact.form.name': {
    tr: 'Ad Soyad',
    en: 'Full Name',
  },
  'contact.form.email': {
    tr: 'E-posta',
    en: 'Email',
  },
  'contact.form.phone': {
    tr: 'Telefon',
    en: 'Phone',
  },
  'contact.form.subject': {
    tr: 'Konu',
    en: 'Subject',
  },
  'contact.form.select': {
    tr: 'Seçiniz',
    en: 'Select',
  },
  'contact.form.general': {
    tr: 'Genel Bilgi',
    en: 'General Information',
  },
  'contact.form.product': {
    tr: 'Ürün Bilgisi',
    en: 'Product Information',
  },
  'contact.form.support': {
    tr: 'Teknik Destek',
    en: 'Technical Support',
  },
  'contact.form.cooperation': {
    tr: 'İş Birliği',
    en: 'Cooperation',
  },
  'contact.form.other': {
    tr: 'Diğer',
    en: 'Other',
  },
  'contact.form.message': {
    tr: 'Mesajınız',
    en: 'Your Message',
  },
  'contact.form.submit': {
    tr: 'Gönder',
    en: 'Submit',
  },
  'contact.form.sending': {
    tr: 'Gönderiliyor...',
    en: 'Sending...',
  },
  'contact.form.success': {
    tr: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    en: 'Your message has been sent successfully. We will get back to you as soon as possible.',
  },
  'contact.form.error': {
    tr: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
    en: 'An error occurred while sending your message. Please try again later.',
  },
  'contact.form.contactus': {
    tr: 'Bize Ulaşın',
    en: 'Contact Us',
  },
  'contact.form.contactus.desc': {
    tr: 'Kaliteli hizmet ve müşteri memnuniyeti odaklı çalışmalarımızla sektörde öncü konumdayız.',
    en: 'We are a leader in the industry with our quality service and customer satisfaction work.',
  },
  'contact.map.title': {
    tr: 'Bize Ulaşın',
    en: 'Find Us',
  },
  // Countries
  'country.france': {
    tr: 'FRANSA',
    en: 'FRANCE',
  },
  'country.canada': {
    tr: 'KANADA',
    en: 'CANADA',
  },
  'country.saudi': {
    tr: 'SUUDİ ARABİSTAN',
    en: 'SAUDI ARABIA',
  },
  'country.jordan': {
    tr: 'ÜRDÜN',
    en: 'JORDAN',
  },
  'country.georgia': {
    tr: 'GÜRCİSTAN',
    en: 'GEORGIA',
  },
  'country.azerbaijan': {
    tr: 'AZERBEYCAN',
    en: 'AZERBAIJAN',
  },
  'country.algeria': {
    tr: 'CEZAYİR',
    en: 'ALGERIA',
  },
  'country.iraq': {
    tr: 'IRAK',
    en: 'IRAQ',
  },
  'country.kosovo': {
    tr: 'KOSOVA',
    en: 'KOSOVO',
  },
  'country.macedonia': {
    tr: 'KUZEY MAKEDONYA',
    en: 'NORTH MACEDONIA',
  },
  'country.libya': {
    tr: 'LİBYA',
    en: 'LIBYA',
  },
  // Product Not Found Page
  'notfound.title': {
    tr: 'Sayfa Bulunamadı',
    en: 'Page Not Found',
  },
  'notfound.message': {
    tr: 'Aradığınız ürün mevcut değil veya kaldırılmış olabilir.',
    en: 'The product you are looking for may not exist or has been removed.',
  },
  'notfound.return': {
    tr: 'Ürünlere Dön',
    en: 'Return to Products',
  },
  // Product Detail Page
  'product.details.title': {
    tr: 'Ürün Detayları',
    en: 'Product Details',
  },
  'product.description': {
    tr: 'Açıklama',
    en: 'Description',
  },
  'product.technical': {
    tr: 'Teknik Detaylar',
    en: 'Technical Details',
  },
  'product.summary': {
    tr: 'Özet',
    en: 'Summary',
  },
  'product.noImage': {
    tr: 'Ürün görseli bulunamadı',
    en: 'No product image found',
  },
  'product.loading': {
    tr: 'Ürün yükleniyor...',
    en: 'Loading product...',
  },
  // Media Page
  'media.title': {
    tr: 'MEDYA',
    en: 'MEDIA',
  },
  'media.subtitle': {
    tr: 'Röportajlar, makaleler, bilimsel yazılar ve daha fazlası. En güncel haberler burada!',
    en: 'Interviews, articles, scientific articles, and more. The latest news is here!',
  },
  'media.cnrexpomed.title': {
    tr: 'CNR Expomed 2024',
    en: 'CNR Expomed 2024',
  },
  'media.cnrexpomed.desc': {
    tr: 'CNR Expomed 2024 fuarındaki standımızdan kareler.',
    en: 'Photos from our booth at CNR Expomed 2024.',
  },
  'media.kibriskongre.title': {
    tr: '2024 Kıbrıs Nükleer Tıp Kongresi',
    en: '2024 Cyprus Nuclear Medicine Congress',
  },
  'media.kibriskongre.desc': {
    tr: '2024 Kıbrıs Nükleer Tıp Kongresi etkinliğinden görüntüler.',
    en: 'Scenes from the 2024 Cyprus Nuclear Medicine Congress.',
  },
  'media.readmore': {
    tr: 'DAHA FAZLA',
    en: 'READ MORE',
  },
  // Certificates
  'certificate.abdeclaration': {
    tr: 'AB Uygunluk Beyanı',
    en: 'EU Declaration of Conformity',
  },
  'certificate.abdeclaration.explanation': {
    tr: 'Ürünlerimizin AB standartlarına uygunluğunu gösteren belge',
    en: 'Certificate showing our products comply with EU standards',
  },
  'certificate.trademark': {
    tr: 'Marka Tescil Belgesi',
    en: 'Trademark Registration Certificate',
  },
  'certificate.trademark.explanation': {
    tr: 'Tescilli marka belgesi',
    en: 'Registered trademark certificate',
  },
};

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with localStorage value if available, or Turkish as fallback
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
        return savedLanguage;
      }
    }
    return 'tr'; // Default to Turkish
  });

  // Update language preference from localStorage on client side only once
  useEffect(() => {
    // Initialize with Turkish if no language is set
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      } else {
        // If no language is saved, set to Turkish by default
        setLanguageState('tr');
        localStorage.setItem('language', 'tr');
      }
    }
  }, []);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook for using language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 