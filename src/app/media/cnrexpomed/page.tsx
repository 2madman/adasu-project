"use client";
import Image from "next/image";
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';

const images = [
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36.jpeg',
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (1).jpeg',
    '/images/cnrexpomed/WhatsApp Image 2025-07-04 at 13.51.36 (2).jpeg',
];

export default function CnrExpomedGallery() {
    const { language } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState(0);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex flex-col items-center mt-24">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">CNR Expomed 2024</h1>
                {/* Description Section */}
                {language === 'tr' ? (
                    <div className="mb-10 max-w-2xl text-center">
                        <p className="text-lg text-gray-800 mb-4">
                            CNR Expomed 2024 fuarında, standımızda ziyaretçilerimizle buluşarak ürünlerimizi ve yenilikçi çözümlerimizi tanıttık. Etkinlik boyunca sektörün önde gelen isimleriyle bilgi alışverişinde bulunduk ve yeni iş bağlantıları kurduk. Fotoğraflarımızda fuarın dinamik atmosferini ve standımızdaki hareketliliği görebilirsiniz.
                        </p>
                    </div>
                ) : (
                    <div className="mb-10 max-w-2xl text-center">
                        <p className="text-lg text-gray-800 mb-4">
                            At CNR Expomed 2024, we welcomed visitors to our booth and showcased our products and innovative solutions. Throughout the event, we exchanged ideas with leading figures in the industry and established new business connections. Our photos reflect the dynamic atmosphere of the fair and the activity at our booth.
                        </p>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
                    {images.map((img, i) => (
                        <div key={img} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow cursor-pointer group" onClick={() => { setModalImg(i); setModalOpen(true); }}>
                            <Image src={img} alt={`CNR Expomed 2024 ${i + 1}`} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
                        <div className="relative w-[90vw] max-w-2xl h-[70vh] bg-white rounded-xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
                            <Image src={images[modalImg]} alt="modal" fill style={{ objectFit: 'contain' }} className="rounded-xl" />
                            <button className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl" onClick={() => setModalOpen(false)}>&times;</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
} 