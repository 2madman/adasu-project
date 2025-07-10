'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function EnAboutPage() {
  const router = useRouter();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Set language to English
    setLanguage('en');
    
    // First, mark that the about page has been visited to prevent redirect loops
    sessionStorage.setItem('aboutPageVisited', 'true');
    
    // Clear old flags for compatibility
    sessionStorage.removeItem('redirected_about');
    sessionStorage.removeItem('language_redirected');
    
    // Add a small delay before redirecting
    setTimeout(() => {
      // Use replace instead of push to avoid adding to history
      router.replace('/about');
    }, 10);
  }, [router, setLanguage]);

  return null;
} 