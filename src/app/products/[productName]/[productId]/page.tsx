'use client';

import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/clientApp';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useLanguage } from '@/app/context/LanguageContext';

interface Product {
    id: string;
    name?: string;
    description?: string;
    technical?: string;
    summary?: string;
    images?: string;
}

export default function UrunlerDetaySayfasi() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const params = useParams();
    const router = useRouter();
    const productId = params.productId as string;
    const productName = params.productName as string;
    const { t, language } = useLanguage();
    const prevLanguage = useRef(language);

    useEffect(() => {
        if (prevLanguage.current !== language) {
            router.push('/');
        }
        prevLanguage.current = language;
    }, [language, router]);

    // Function to get array of image URLs from the imageUrl string
    const getImageUrls = (imageUrlString?: string): string[] => {
        if (!imageUrlString) return [];

        // Split on newlines and filter out empty items
        const images = imageUrlString
            .replace(/\r\n/g, '\n')
            .replace(/\\n/g, '\n')
            .split(/\n+/)
            .filter(url => url.trim() !== '')
            .map(img => {
                // Handle base64 encoded images - add data:image prefix if not present
                if (img.startsWith('data:')) {
                    return img; // Already has data URI prefix
                } else {
                    // Add data URI prefix to base64 string
                    return `data:image/jpeg;base64,${img}`;
                }
            });

        return images;
    };

    // Navigate to the next image
    const nextImage = (imageUrls: string[], isModal = false) => {
        if (isModal) {
            setModalImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    // Navigate to the previous image
    const prevImage = (imageUrls: string[], isModal = false) => {
        if (isModal) {
            setModalImageIndex((prevIndex) =>
                prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
            );
        } else {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
            );
        }
    };

    // Open modal with the current image
    const openImageModal = (index: number) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Close the modal
    const closeImageModal = () => {
        setIsModalOpen(false);
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    };

    // Handle modal click to prevent closing when clicking on the image
    const handleModalClick = (e: React.MouseEvent) => {
        // Only close if clicking on the backdrop (not the image)
        if (e.target === e.currentTarget) {
            closeImageModal();
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(`Fetching product with ID: ${productId}...`);
            try {
                // Debug: Check if db is properly initialized
                console.log("Firestore DB instance:", db);

                const productRef = doc(db, 'products', productId);
                console.log("Product document reference created:", productRef);

                const productSnapshot = await getDoc(productRef);
                console.log("Product snapshot received:", productSnapshot);

                if (productSnapshot.exists()) {
                    const data = productSnapshot.data();
                    console.log("Product data:", data);

                    const productData: Product = {
                        id: productSnapshot.id,
                        name: data.name || null,
                        description: data.description || null,
                        technical: data.technical || null,
                        summary: data.summary || null,
                        images: data.images || null,
                    };

                    console.log("Processed product data:", productData);
                    setProduct(productData);
                } else {
                    console.log("No product found with this ID");
                    setError(`Sayfa Bulunamadı`);
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
                setError(`Ürün yüklenirken hata oluştu: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            setError("Ürün ID'si eksik");
            setLoading(false);
        }
    }, [productId]);


    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center py-8">
                    <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100 my-8 p-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-700 mb-4">{t('notfound.title')}</h1>
                        <p className="text-gray-600 mb-6">{t('notfound.message')}</p>
                        <button
                            onClick={() => router.push(`/products/${productName}`)}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium"
                        >
                            {t('notfound.return')}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col">
            <Navbar />
            <div className="flex-grow max-w-5xl mx-auto mt-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-8 border-b-2 border-blue-300 pb-2 drop-shadow-sm">
                    {t('product.details.title')}
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full bg-blue-400 mb-4"></div>
                            <p className="text-blue-600 font-medium">{t('product.loading')}</p>
                        </div>
                    </div>
                ) : product ? (
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
                        <div className="p-6 pb-3">
                            <h2 className="text-3xl font-semibold text-gray-800 tracking-tight mb-2">
                                {product.name || 'İsimsiz Ürün'}
                            </h2>
                            <div className="w-20 h-1 bg-blue-500 rounded mb-6"></div>
                        </div>

                        <div className="p-6">
                            {product.description || product.technical || product.summary ? (
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left column - Product details */}
                                    <div className="flex-1">
                                        {product.description && (
                                            <div className="mb-8 p-6 rounded-lg border border-blue-200 shadow-sm">
                                                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                                                    {t('product.description')}
                                                </h3>
                                                {product.description && (
                                                    <div className="mb-6">
                                                        <p className="text-gray-700 text-lg leading-relaxed font-sans">
                                                            {product.description?.split('\\n').map((line, index, array) => (
                                                                line.trim() && (
                                                                    <span key={index} className="block mb-3 last:mb-0">
                                                                        <span className="text-blue-600 mr-2">•</span>
                                                                        {line}
                                                                    </span>
                                                                )
                                                            ))}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {product.technical && (
                                            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                                                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                                                    {t('product.technical')}
                                                </h3>
                                                <p className="text-gray-700 text-lg leading-relaxed font-sans">
                                                    {product.technical?.split('\\n').map((line, index, array) => (
                                                        line.trim() && (
                                                            <span key={index} className="block mb-3 last:mb-0">
                                                                <span className="text-blue-600 mr-2">•</span>
                                                                {line}
                                                            </span>
                                                        )
                                                    ))}
                                                </p>
                                            </div>
                                        )}

                                        {product.summary && (
                                            <div className="mb-8 p-6 rounded-lg border border-blue-200 shadow-sm">
                                                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                                                    {t('product.summary')}
                                                </h3>
                                                <p className="text-gray-700 text-lg leading-relaxed font-sans">
                                                    {product.summary?.split('\\n').map((line, index, array) => (
                                                        line.trim() && (
                                                            <span key={index} className="block mb-3 last:mb-0">
                                                                <span className="text-blue-600 mr-2">•</span>
                                                                {line}
                                                            </span>
                                                        )
                                                    ))}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right column - Product images */}
                                    <div className="md:w-1/2 lg:w-2/5">
                                        {product.images ? (
                                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.images);
                                                    if (imageUrls.length === 0) return null;

                                                    return (
                                                        <div className="relative">
                                                            <img
                                                                src={imageUrls[currentImageIndex]}
                                                                alt={`${product.name || 'Ürün görseli'} ${currentImageIndex + 1}`}
                                                                className="w-full h-auto cursor-pointer object-cover aspect-square"
                                                                onClick={() => openImageModal(currentImageIndex)}
                                                            />

                                                            {imageUrls.length > 1 && (
                                                                <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
                                                                    {currentImageIndex + 1} / {imageUrls.length}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()}

                                                {/* Thumbnail navigation */}
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.images);
                                                    if (imageUrls.length <= 1) return null;

                                                    return (
                                                        <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
                                                            {imageUrls.map((url, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${currentImageIndex === index
                                                                        ? 'border-blue-500'
                                                                        : 'border-transparent'
                                                                        }`}
                                                                    onClick={() => setCurrentImageIndex(index)}
                                                                >
                                                                    <img
                                                                        src={url}
                                                                        alt={`${product.name || 'Ürün'} küçük görsel ${index + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        ) : (
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                                                <p className="text-gray-500 text-sm">{t('product.noImage')}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center px-4">
                                    <div className="w-full max-w-[90%]">
                                        {product.images ? (
                                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.images);
                                                    if (imageUrls.length === 0) return null;

                                                    return (
                                                        <div className="relative">
                                                            <img
                                                                src={imageUrls[currentImageIndex]}
                                                                alt={`${product.name || 'Ürün görseli'} ${currentImageIndex + 1}`}
                                                                className="w-full h-auto cursor-pointer object-cover aspect-square"
                                                                onClick={() => openImageModal(currentImageIndex)}
                                                            />

                                                            {imageUrls.length > 1 && (
                                                                <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
                                                                    {currentImageIndex + 1} / {imageUrls.length}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()}

                                                {/* Thumbnail navigation */}
                                                {(() => {
                                                    const imageUrls = getImageUrls(product.images);
                                                    if (imageUrls.length <= 1) return null;

                                                    return (
                                                        <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
                                                            {imageUrls.map((url, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${currentImageIndex === index
                                                                        ? 'border-blue-500'
                                                                        : 'border-transparent'
                                                                        }`}
                                                                    onClick={() => setCurrentImageIndex(index)}
                                                                >
                                                                    <img
                                                                        src={url}
                                                                        alt={`${product.name || 'Ürün'} küçük görsel ${index + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        ) : (
                                            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                                                <p className="text-gray-500 text-sm">{t('product.noImage')}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-10 flex justify-end">
                                <button
                                    onClick={() => router.push(`/products/${productName}`)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                                >
                                    {t('notfound.return')}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center shadow-md">
                        <p className="text-blue-800 font-medium">
                            Ürün bulunamadı. Lütfen ürünün Firestore veritabanında olup olmadığını kontrol edin.
                        </p>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {isModalOpen && product?.images && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={handleModalClick}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
                        {/* Close button */}
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-blue-300 z-10"
                            onClick={closeImageModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image container */}
                        <div className="bg-white/10 rounded-lg overflow-hidden">
                            {(() => {
                                const imageUrls = getImageUrls(product.images);
                                return (
                                    <div className="relative">
                                        <img
                                            src={imageUrls[modalImageIndex]}
                                            alt={`${product.name || 'Ürün görseli'} ${modalImageIndex + 1} (büyük görünüm)`}
                                            className="w-full h-auto max-h-[80vh] object-contain"
                                        />

                                        {imageUrls.length > 1 && (
                                            <>
                                                {/* Modal navigation controls */}
                                                <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            prevImage(imageUrls, true);
                                                        }}
                                                        className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-md transition-all"
                                                        aria-label="Önceki görsel"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            nextImage(imageUrls, true);
                                                        }}
                                                        className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 shadow-md transition-all"
                                                        aria-label="Sonraki görsel"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Modal image counter */}
                        <div className="text-center text-white mt-4">
                            {(() => {
                                const imageUrls = getImageUrls(product.images);
                                return imageUrls.length > 1 ? (
                                    <p className="font-medium">
                                        {modalImageIndex + 1} / {imageUrls.length}
                                    </p>
                                ) : null;
                            })()}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
} 