"use client";
import Image from "next/image";
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useState } from "react";
import { useLanguage } from '@/app/context/LanguageContext';

const images = [
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35.jpeg',
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.35 (1).jpeg',
    '/images/nükleerkongre/WhatsApp Image 2025-07-04 at 13.51.36.jpeg',
];

export default function KibrisKongreGallery() {
    const { language } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState(0);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex flex-col items-center mt-24">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center tracking-tight">2024 Kıbrıs Nükleer Tıp Kongresi</h1>
                {/* Description Section */}
                {language === 'tr' ? (
                    <div className="mb-10 max-w-2xl text-center">
                        <p className="text-lg text-gray-800 mb-4">
                            2024 Kıbrıs Nükleer Tıp Kongresi&apos;nde, nükleer tıp alanındaki en son gelişmeler ve yenilikçi uygulamalar katılımcılarla paylaşıldı. Etkinlik boyunca, sektör profesyonelleri bilgi alışverişinde bulunarak yeni iş birliklerinin temellerini attı. Fotoğraflarımızda, kongre atmosferini ve katılımcıların etkileşimini görebilirsiniz.
                        </p>
                    </div>
                ) : (
                    <div className="mb-10 max-w-2xl text-center">
                        <p className="text-lg text-gray-800 mb-4">
                            At the 2024 Cyprus Nuclear Medicine Congress, the latest advancements and innovative practices in nuclear medicine were shared with participants. Throughout the event, industry professionals exchanged knowledge and laid the groundwork for new collaborations. Our photos capture the vibrant atmosphere and the engagement of attendees at the congress.
                        </p>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
                    {images.map((img, i) => (
                        <div key={img} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow cursor-pointer group" onClick={() => { setModalImg(i); setModalOpen(true); }}>
                            <Image src={img} alt={`Kıbrıs Kongre 2024 ${i + 1}`} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-300" />
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