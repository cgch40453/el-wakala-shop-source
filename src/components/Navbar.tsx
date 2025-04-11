'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            El Wakala Shop
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link href="/" className="text-white hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link href="/services" className="text-white hover:text-primary transition-colors">
              الخدمات
            </Link>
            <Link href="/about" className="text-white hover:text-primary transition-colors">
              من نحن
            </Link>
            <Link href="/contact" className="text-white hover:text-primary transition-colors">
              اتصل بنا
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/login" className="text-white hover:text-primary transition-colors">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="btn-primary">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
