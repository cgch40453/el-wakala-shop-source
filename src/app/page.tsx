'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card z-0"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFD700_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">El Wakala Shop</span> لخدمات السوشيال ميديا
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              زيادة متابعينك، مشاهداتك، لايكاتك وتعليقاتك على جميع منصات التواصل الاجتماعي بأسعار منافسة وجودة عالية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-primary text-center">
                تصفح الخدمات
              </Link>
              <Link href="/register" className="btn-secondary text-center">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-card">
        <div className="container">
          <h2 className="heading-lg text-center mb-12">لماذا تختار El Wakala Shop؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">سرعة التنفيذ</h3>
              <p className="text-gray-300">
                نبدأ في تنفيذ طلبك فور استلامه، مع ضمان إتمام معظم الطلبات خلال 24 ساعة.
              </p>
            </div>
            
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">جودة عالية</h3>
              <p className="text-gray-300">
                نقدم خدمات عالية الجودة مع حسابات حقيقية ونشطة، مما يضمن استمرارية التفاعل.
              </p>
            </div>
            
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">أسعار منافسة</h3>
              <p className="text-gray-300">
                نقدم أفضل الأسعار في السوق مع خصومات خاصة للعملاء الدائمين والطلبات الكبيرة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <h2 className="heading-lg text-center mb-12">خدماتنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-pink-500 text-xl font-bold">IG</span>
                </div>
                <h3 className="text-xl font-bold">خدمات انستاجرام</h3>
              </div>
              <p className="text-gray-300 mb-4">
                متابعين، لايكات، تعليقات، مشاهدات ستوري، حفظ المنشورات وغيرها.
              </p>
              <Link href="/services?category=instagram" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-500 text-xl font-bold">FB</span>
                </div>
                <h3 className="text-xl font-bold">خدمات فيسبوك</h3>
              </div>
              <p className="text-gray-300 mb-4">
                متابعين، لايكات، مشاهدات، تعليقات، مشاركات وتفاعل للصفحات والمنشورات.
              </p>
              <Link href="/services?category=facebook" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-red-500 text-xl font-bold">YT</span>
                </div>
                <h3 className="text-xl font-bold">خدمات يوتيوب</h3>
              </div>
              <p className="text-gray-300 mb-4">
                مشتركين، مشاهدات، لايكات، تعليقات، مشاركات وساعات مشاهدة.
              </p>
              <Link href="/services?category=youtube" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-cyan-500 text-xl font-bold">TT</span>
                </div>
                <h3 className="text-xl font-bold">خدمات تيك توك</h3>
              </div>
              <p className="text-gray-300 mb-4">
                متابعين، لايكات، مشاهدات، تعليقات، مشاركات وزيادة التفاعل.
              </p>
              <Link href="/services?category=tiktok" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-sky-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sky-500 text-xl font-bold">TW</span>
                </div>
                <h3 className="text-xl font-bold">خدمات تويتر</h3>
              </div>
              <p className="text-gray-300 mb-4">
                متابعين، لايكات، ريتويت، تعليقات، مشاهدات وتفاعل.
              </p>
              <Link href="/services?category=twitter" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-500 text-xl font-bold">+</span>
                </div>
                <h3 className="text-xl font-bold">خدمات أخرى</h3>
              </div>
              <p className="text-gray-300 mb-4">
                خدمات لمنصات أخرى مثل لينكد إن، تيليجرام، سناب شات، وغيرها.
              </p>
              <Link href="/services?category=other" className="text-primary hover:text-primary/80">
                عرض الخدمات &larr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-card">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">ابدأ الآن وانمِ حسابك على السوشيال ميديا</h2>
            <p className="text-xl text-gray-300 mb-8">
              سجل حساب جديد واحصل على خصم 10% على أول طلب لك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary text-center">
                إنشاء حساب
              </Link>
              <Link href="/services" className="btn-secondary text-center">
                تصفح الخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
