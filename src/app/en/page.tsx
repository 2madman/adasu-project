'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function EnHomePage() {
  const router = useRouter();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Set language to English
    setLanguage('en');

    // Add a small delay before redirecting
    setTimeout(() => {
      // Use replace instead of push to avoid adding to history
      router.replace('/');
    }, 10);
  }, [router, setLanguage]);

  return null;
} 