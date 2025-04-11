'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminServices() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Mock services data for demonstration
  const services = [
    { 
      id: 1, 
      name: 'متابعين انستاجرام عرب', 
      category: 'instagram',
      price: 25,
      minOrder: 100,
      maxOrder: 10000,
      status: 'active'
    },
    { 
      id: 2, 
      name: 'لايكات انستاجرام', 
      category: 'instagram',
      price: 10,
      minOrder: 50,
      maxOrder: 5000,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'مشاهدات تيك توك', 
      category: 'tiktok',
      price: 5,
      minOrder: 1000,
      maxOrder: 100000,
      status: 'active'
    },
    { 
      id: 4, 
      name: 'متابعين تيك توك', 
      category: 'tiktok',
      price: 30,
      minOrder: 100,
      maxOrder: 10000,
      status: 'active'
    },
    { 
      id: 5, 
      name: 'مشاهدات يوتيوب', 
      category: 'youtube',
      price: 15,
      minOrder: 1000,
      maxOrder: 50000,
      status: 'active'
    },
    { 
      id: 6, 
      name: 'اشتراكات يوتيوب', 
      category: 'youtube',
      price: 40,
      minOrder: 100,
      maxOrder: 5000,
      status: 'inactive'
    },
  ];

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'instagram', name: 'انستاجرام' },
    { id: 'tiktok', name: 'تيك توك' },
    { id: 'youtube', name: 'يوتيوب' },
    { id: 'facebook', name: 'فيسبوك' },
    { id: 'twitter', name: 'تويتر' },
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <ProtectedRoute adminOnly>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="card sticky top-24">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl text-primary font-bold">
                        {user?.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold">{user?.username}</h2>
                    <p className="text-primary font-bold">مدير النظام</p>
                  </div>

                  <nav className="space-y-2">
                    <Link
                      href="/admin"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      لوحة التحكم
                    </Link>
                    <Link
                      href="/admin/services"
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
                    >
                      إدارة الخدمات
                    </Link>
                    <Link
                      href="/admin/orders"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إدارة الطلبات
                    </Link>
                    <Link
                      href="/admin/users"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إدارة المستخدمين
                    </Link>
                    <Link
                      href="/admin/api"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إعدادات API
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إعدادات الموقع
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-4">
                <div className="card mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="heading-lg mb-0">إدارة الخدمات</h1>
                    <button className="btn-primary">إضافة خدمة جديدة</button>
                  </div>
                  <p className="text-gray-300">
                    إدارة خدمات السوشيال ميديا المقدمة في الموقع. يمكنك إضافة وتعديل وحذف الخدمات من هنا.
                  </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-6 py-2 rounded-full transition-all ${
                        activeTab === category.id
                          ? 'bg-primary text-black font-bold'
                          : 'bg-card text-white hover:bg-primary/20'
                      }`}
                      onClick={() => setActiveTab(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Services Table */}
                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-right">الرقم</th>
                          <th className="py-3 px-4 text-right">اسم الخدمة</th>
                          <th className="py-3 px-4 text-right">الفئة</th>
                          <th className="py-3 px-4 text-right">السعر</th>
                          <th className="py-3 px-4 text-right">الحد الأدنى</th>
                          <th className="py-3 px-4 text-right">الحد الأقصى</th>
                          <th className="py-3 px-4 text-right">الحالة</th>
                          <th className="py-3 px-4 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.map((service) => (
                          <tr key={service.id} className="border-b border-border">
                            <td className="py-3 px-4">{service.id}</td>
                            <td className="py-3 px-4">{service.name}</td>
                            <td className="py-3 px-4">
                              {service.category === 'instagram' ? 'انستاجرام' : 
                               service.category === 'tiktok' ? 'تيك توك' : 
                               service.category === 'youtube' ? 'يوتيوب' : 
                               service.category === 'facebook' ? 'فيسبوك' : 
                               service.category === 'twitter' ? 'تويتر' : service.category}
                            </td>
                            <td className="py-3 px-4">${service.price}</td>
                            <td className="py-3 px-4">{service.minOrder}</td>
                            <td className="py-3 px-4">{service.maxOrder}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                service.status === 'active' 
                                  ? 'bg-green-900/20 text-green-500' 
                                  : 'bg-red-900/20 text-red-500'
                              }`}>
                                {service.status === 'active' ? 'مفعل' : 'معطل'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2 space-x-reverse">
                                <button className="p-1 text-blue-500 hover:text-blue-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-red-500 hover:text-red-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
}
