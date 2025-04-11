'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Mock statistics for demonstration
  const stats = {
    totalUsers: 245,
    totalOrders: 1893,
    pendingOrders: 37,
    totalRevenue: 12580,
    recentOrders: [
      { id: 'ORD-1234', service: 'متابعين انستاجرام', user: 'ahmed123', quantity: 1000, price: 25, status: 'مكتمل', date: '2025-04-10' },
      { id: 'ORD-1235', service: 'لايكات فيسبوك', user: 'sara87', quantity: 500, price: 12, status: 'قيد التنفيذ', date: '2025-04-11' },
      { id: 'ORD-1236', service: 'مشاهدات يوتيوب', user: 'mohamed22', quantity: 5000, price: 75, status: 'قيد الانتظار', date: '2025-04-11' },
      { id: 'ORD-1237', service: 'متابعين تيك توك', user: 'layla55', quantity: 2000, price: 60, status: 'قيد التنفيذ', date: '2025-04-11' },
    ]
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
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
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
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right py-2 px-4 rounded-md hover:bg-card text-red-500"
                    >
                      تسجيل الخروج
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-4">
                <div className="card mb-8">
                  <h1 className="heading-lg mb-6">لوحة تحكم المدير</h1>
                  <p className="text-gray-300 mb-4">
                    مرحباً بك في لوحة تحكم المدير. من هنا يمكنك إدارة الخدمات والطلبات والمستخدمين وإعدادات الموقع.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">إجمالي المستخدمين</h3>
                    <p className="text-3xl text-primary font-bold">{stats.totalUsers}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">إجمالي الطلبات</h3>
                    <p className="text-3xl text-primary font-bold">{stats.totalOrders}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">الطلبات المعلقة</h3>
                    <p className="text-3xl text-primary font-bold">{stats.pendingOrders}</p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">إجمالي الإيرادات</h3>
                    <p className="text-3xl text-primary font-bold">${stats.totalRevenue}</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="heading-md mb-0">أحدث الطلبات</h2>
                    <Link href="/admin/orders" className="text-primary">
                      عرض الكل
                    </Link>
                  </div>

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
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border">
                            <td className="py-3 px-4">{order.id}</td>
                            <td className="py-3 px-4">{order.service}</td>
                            <td className="py-3 px-4">{order.user}</td>
                            <td className="py-3 px-4">{order.quantity}</td>
                            <td className="py-3 px-4">${order.price}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'مكتمل' 
                                  ? 'bg-green-900/20 text-green-500' 
                                  : order.status === 'قيد التنفيذ'
                                  ? 'bg-blue-900/20 text-blue-500'
                                  : 'bg-yellow-900/20 text-yellow-500'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{order.date}</td>
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
