'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'instagram', name: 'انستاجرام' },
    { id: 'tiktok', name: 'تيك توك' },
    { id: 'youtube', name: 'يوتيوب' },
    { id: 'facebook', name: 'فيسبوك' },
    { id: 'twitter', name: 'تويتر' },
  ];
  
  const services = [
    {
      id: 1,
      title: 'متابعين انستاجرام عرب',
      description: 'متابعين حقيقيين من دول عربية مختلفة',
      price: 25,
      category: 'instagram',
      minOrder: 100,
      maxOrder: 10000,
    },
    {
      id: 2,
      title: 'لايكات انستاجرام',
      description: 'لايكات سريعة وآمنة لمنشوراتك',
      price: 10,
      category: 'instagram',
      minOrder: 50,
      maxOrder: 5000,
    },
    {
      id: 3,
      title: 'مشاهدات تيك توك',
      description: 'زيادة مشاهدات فيديوهاتك على تيك توك',
      price: 5,
      category: 'tiktok',
      minOrder: 1000,
      maxOrder: 100000,
    },
    {
      id: 4,
      title: 'متابعين تيك توك',
      description: 'متابعين حقيقيين لحسابك على تيك توك',
      price: 30,
      category: 'tiktok',
      minOrder: 100,
      maxOrder: 10000,
    },
    {
      id: 5,
      title: 'مشاهدات يوتيوب',
      description: 'زيادة مشاهدات فيديوهاتك على يوتيوب',
      price: 15,
      category: 'youtube',
      minOrder: 1000,
      maxOrder: 50000,
    },
    {
      id: 6,
      title: 'اشتراكات يوتيوب',
      description: 'زيادة عدد المشتركين في قناتك',
      price: 40,
      category: 'youtube',
      minOrder: 100,
      maxOrder: 5000,
    },
    {
      id: 7,
      title: 'لايكات فيسبوك',
      description: 'لايكات لمنشوراتك على فيسبوك',
      price: 12,
      category: 'facebook',
      minOrder: 100,
      maxOrder: 10000,
    },
    {
      id: 8,
      title: 'متابعين فيسبوك',
      description: 'متابعين لصفحتك على فيسبوك',
      price: 35,
      category: 'facebook',
      minOrder: 100,
      maxOrder: 10000,
    },
    {
      id: 9,
      title: 'متابعين تويتر',
      description: 'متابعين حقيقيين لحسابك على تويتر',
      price: 30,
      category: 'twitter',
      minOrder: 100,
      maxOrder: 5000,
    },
  ];
  
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="section bg-gradient-to-b from-background to-card">
        <div className="container mx-auto text-center">
          <h1 className="heading-xl">
            <span className="text-gradient">خدماتنا</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            اختر من بين مجموعة واسعة من خدمات السوشيال ميديا عالية الجودة بأسعار تنافسية
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-black font-bold'
                    : 'bg-card text-white hover:bg-primary/20'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <div key={service.id} className="card hover:border-primary transition-colors">
                <h3 className="heading-sm text-primary mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white">الحد الأدنى للطلب:</span>
                  <span className="text-primary font-bold">{service.minOrder}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white">الحد الأقصى للطلب:</span>
                  <span className="text-primary font-bold">{service.maxOrder}</span>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white">السعر لكل 1000:</span>
                  <span className="text-2xl text-primary font-bold">${service.price}</span>
                </div>
                
                <Link href={`/services/${service.id}`} className="btn-primary w-full text-center">
                  طلب الخدمة
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
