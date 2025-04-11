'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Mock orders data for demonstration
  const orders = [
    { 
      id: 'ORD-1234', 
      service: 'متابعين انستاجرام', 
      user: 'ahmed123',
      quantity: 1000,
      price: 25,
      status: 'completed',
      date: '2025-04-10'
    },
    { 
      id: 'ORD-1235', 
      service: 'لايكات فيسبوك', 
      user: 'sara87',
      quantity: 500,
      price: 12,
      status: 'processing',
      date: '2025-04-11'
    },
    { 
      id: 'ORD-1236', 
      service: 'مشاهدات يوتيوب', 
      user: 'mohamed22',
      quantity: 5000,
      price: 75,
      status: 'pending',
      date: '2025-04-11'
    },
    { 
      id: 'ORD-1237', 
      service: 'متابعين تيك توك', 
      user: 'layla55',
      quantity: 2000,
      price: 60,
      status: 'processing',
      date: '2025-04-11'
    },
    { 
      id: 'ORD-1238', 
      service: 'تعليقات انستاجرام', 
      user: 'omar44',
      quantity: 100,
      price: 30,
      status: 'completed',
      date: '2025-04-09'
    },
    { 
      id: 'ORD-1239', 
      service: 'متابعين تويتر', 
      user: 'nour77',
      quantity: 1500,
      price: 45,
      status: 'cancelled',
      date: '2025-04-08'
    },
  ];

  const statusFilters = [
    { id: 'all', name: 'الكل' },
    { id: 'pending', name: 'قيد الانتظار' },
    { id: 'processing', name: 'قيد التنفيذ' },
    { id: 'completed', name: 'مكتمل' },
    { id: 'cancelled', name: 'ملغي' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-900/20 text-green-500';
      case 'processing': return 'bg-blue-900/20 text-blue-500';
      case 'pending': return 'bg-yellow-900/20 text-yellow-500';
      case 'cancelled': return 'bg-red-900/20 text-red-500';
      default: return 'bg-gray-900/20 text-gray-500';
    }
  };

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
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إدارة الخدمات
                    </Link>
                    <Link
                      href="/admin/orders"
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
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
                    <h1 className="heading-lg mb-0">إدارة الطلبات</h1>
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="btn-secondary">تصدير الطلبات</button>
                      <button className="btn-primary">إضافة طلب جديد</button>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    إدارة طلبات العملاء ومتابعة حالتها. يمكنك تحديث حالة الطلبات وإرسالها للـ API الخارجي من هنا.
                  </p>
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {statusFilters.map(filter => (
                    <button
                      key={filter.id}
                      className={`px-6 py-2 rounded-full transition-all ${
                        activeTab === filter.id
                          ? 'bg-primary text-black font-bold'
                          : 'bg-card text-white hover:bg-primary/20'
                      }`}
                      onClick={() => setActiveTab(filter.id)}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>

                {/* Orders Table */}
                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-right">رقم الطلب</th>
                          <th className="py-3 px-4 text-right">الخدمة</th>
                          <th className="py-3 px-4 text-right">المستخدم</th>
                          <th className="py-3 px-4 text-right">الكمية</th>
                          <th className="py-3 px-4 text-right">السعر</th>
                          <th className="py-3 px-4 text-right">الحالة</th>
                          <th className="py-3 px-4 text-right">التاريخ</th>
                          <th className="py-3 px-4 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border">
                            <td className="py-3 px-4">{order.id}</td>
                            <td className="py-3 px-4">{order.service}</td>
                            <td className="py-3 px-4">{order.user}</td>
                            <td className="py-3 px-4">{order.quantity}</td>
                            <td className="py-3 px-4">${order.price}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </td>
                            <td className="py-3 px-4">{order.date}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2 space-x-reverse">
                                <button className="p-1 text-blue-500 hover:text-blue-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-green-500 hover:text-green-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-red-500 hover:text-red-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
