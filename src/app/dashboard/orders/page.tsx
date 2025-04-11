'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function UserOrders() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Mock orders data for demonstration
  const orders = [
    { 
      id: 'ORD-1001', 
      service: 'متابعين انستاجرام', 
      link: 'https://instagram.com/username',
      quantity: 1000,
      price: 25,
      status: 'completed',
      date: '2025-04-05',
      start_count: 5240,
      remains: 0
    },
    { 
      id: 'ORD-1002', 
      service: 'لايكات فيسبوك', 
      link: 'https://facebook.com/post/123456',
      quantity: 500,
      price: 12,
      status: 'processing',
      date: '2025-04-08',
      start_count: 320,
      remains: 200
    },
    { 
      id: 'ORD-1003', 
      service: 'مشاهدات يوتيوب', 
      link: 'https://youtube.com/watch?v=abcdef',
      quantity: 5000,
      price: 75,
      status: 'pending',
      date: '2025-04-10',
      start_count: 0,
      remains: 5000
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
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                    <p className="text-gray-400">{user?.email}</p>
                  </div>

                  <nav className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      لوحة التحكم
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
                    >
                      طلباتي
                    </Link>
                    <Link
                      href="/dashboard/balance"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      رصيدي
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      الملف الشخصي
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="card mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="heading-lg mb-0">طلباتي</h1>
                    <Link href="/services" className="btn-primary">
                      طلب جديد
                    </Link>
                  </div>
                  <p className="text-gray-300">
                    عرض وتتبع جميع طلباتك. يمكنك مشاهدة تفاصيل كل طلب وحالته الحالية.
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
                          <th className="py-3 px-4 text-right">الكمية</th>
                          <th className="py-3 px-4 text-right">السعر</th>
                          <th className="py-3 px-4 text-right">الحالة</th>
                          <th className="py-3 px-4 text-right">التاريخ</th>
                          <th className="py-3 px-4 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length > 0 ? (
                          filteredOrders.map((order) => (
                            <tr key={order.id} className="border-b border-border">
                              <td className="py-3 px-4">{order.id}</td>
                              <td className="py-3 px-4">{order.service}</td>
                              <td className="py-3 px-4">{order.quantity}</td>
                              <td className="py-3 px-4">${order.price}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                                  {getStatusText(order.status)}
                                </span>
                              </td>
                              <td className="py-3 px-4">{order.date}</td>
                              <td className="py-3 px-4">
                                <Link 
                                  href={`/dashboard/orders/${order.id}`}
                                  className="text-primary hover:text-primary/80"
                                >
                                  التفاصيل
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="py-4 px-4 text-center" colSpan={7}>
                              لا توجد طلبات في هذه الفئة
                            </td>
                          </tr>
                        )}
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
