'use client';

import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/clientApp';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { useLanguage } from '@/app/context/LanguageContext';

interface ProductDetail {
    products: string[];
    images?: string;
}

export default function UrunDetaySayfasi() {
    const params = useParams();
    const router = useRouter();
    const { language } = useLanguage();
    const productName = typeof params.productName === 'string' ? decodeURIComponent(params.productName) : '';

    const [productDetails, setProductDetails] = useState<ProductDetail | null>(null);
    const [productImages, setProductImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const prevLanguage = useRef(language);

    useEffect(() => {
        if (prevLanguage.current !== language) {
            router.push('/');
        }
        prevLanguage.current = language;
    }, [language, router]);

    // Parse and extract base64 image strings
    const parseImages = (imagesString?: string): string[] => {
        if (!imagesString) return [];
        return imagesString
            .replace(/\r\n/g, '\n')
            .replace(/\\n/g, '\n')
            .split(/\n+/)
            .filter(Boolean)
            .map(img => img.trim());
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!productName) {
                setError(language === 'en' ? 'Product name missing' : 'Ürün adı eksik');
                setLoading(false);
                return;
            }

            try {

                // Get document from 'pages' collection where doc id is the product name
                const productRef = doc(db, 'pages', productName);
                const productSnapshot = await getDoc(productRef);

                if (productSnapshot.exists()) {
                    const data = productSnapshot.data();

                    // Process products field - splitting by newline
                    if (data.products) {
                        // Split the product string on newlines and create an array of individual products
                        const rawText = data.products;

                        // Enhanced split that handles different line break formats and common delimiters
                        const productsList = rawText
                            .replace(/\r\n/g, '\n') // Normalize Windows line breaks
                            .replace(/\\n/g, '\n')  // Handle escaped newlines
                            .replace(/\s*\n\s*/g, '\n') // Trim whitespace around newlines
                            .split(/\n+/) // Split by one or more newlines
                            .filter(Boolean) // Remove empty strings
                            .map((p: string) => p.trim());


                        setProductDetails({
                            products: productsList,
                            images: data.images || ''
                        });

                        // Parse and set images if they exist
                        if (data.images) {
                            setProductImages(parseImages(data.images));
                        }
                    } else {
                        setError(language === 'en' ? 'Product information not found' : 'Ürün bilgisi bulunamadı');
                    }
                } else {
                    setError(language === 'en'
                        ? `No information found for ${productName}`
                        : `${productName} için bilgi bulunamadı`);
                }
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError(language === 'en' ? 'Failed to load product details' : 'Ürün detayları yüklenemedi');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productName, language]);

    const convertToUrlFormat = (text: string): string => {
        // Convert Turkish characters to English equivalents
        const turkishToEnglish: Record<string, string> = {
            'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
            'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
        };

        return text
            .toLowerCase()
            .split('')
            .map(char => turkishToEnglish[char] || char)
            .join('')
            .replace(/\s+/g, '-')     // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
    };

    const handleReturnToProducts = () => {
        // Redirect to main page
        router.push('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 pt-32 pb-16">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">{productName}</h1>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor"
                                onClick={handleReturnToProducts}
                            >
                                {language === 'en' ? 'Return to Home' : 'Anasayfaya Dön'}
                            </button>
                        </div>
                    </div>
                )}

                {productDetails && productDetails.products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {productDetails.products.map((product, index) => {
                            // Get image for this product if available
                            const productImage = productImages[index] || null;

                            return (
                                <div
                                    key={index}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Display image if available */}
                                    {productImage && (
                                        <div className="h-48 overflow-hidden bg-gray-100">
                                            <img
                                                src={productImage.startsWith('data:') ? productImage : `data:image/jpeg;base64,${productImage}`}
                                                alt={product}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 min-h-[3rem] line-clamp-2">{product}</h3>
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full cursor-pointer"
                                            onClick={() => {
                                                router.push(`/products/${productName}/${convertToUrlFormat(product)}`);
                                            }}
                                        >
                                            {language === 'en' ? 'View Details' : 'Detayları Görüntüle'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {productDetails && productDetails.products.length === 0 && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                        {language === 'en'
                            ? `No products found for ${productName}`
                            : `${productName} için hiç ürün bulunamadı`}
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                onClick={handleReturnToProducts}
                            >
                                {language === 'en' ? 'Return to Home' : 'Anasayfaya Dön'}
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
} 