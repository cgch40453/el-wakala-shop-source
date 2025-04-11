'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
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
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
                    >
                      لوحة التحكم
                    </Link>
                    <Link
                      href="/dashboard/orders"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
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
              <div className="lg:col-span-3">
                <div className="card mb-8">
                  <h1 className="heading-lg mb-6">مرحباً، {user?.username}!</h1>
                  <p className="text-gray-300 mb-4">
                    مرحباً بك في لوحة تحكم المستخدم الخاصة بك. من هنا يمكنك إدارة طلباتك ورصيدك وملفك الشخصي.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">الرصيد الحالي</h3>
                    <p className="text-3xl text-primary font-bold">$0.00</p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">الطلبات النشطة</h3>
                    <p className="text-3xl text-primary font-bold">0</p>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold mb-2">إجمالي الطلبات</h3>
                    <p className="text-3xl text-primary font-bold">0</p>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="heading-md mb-0">أحدث الطلبات</h2>
                    <Link href="/dashboard/orders" className="text-primary">
                      عرض الكل
                    </Link>
                  </div>

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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4 px-4 text-center" colSpan={6}>
                            لا توجد طلبات حتى الآن
                          </td>
                        </tr>
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
