'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminUsers() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Mock users data for demonstration
  const users = [
    { 
      id: 1, 
      username: 'ahmed123', 
      email: 'ahmed@example.com',
      role: 'user',
      balance: 120,
      orders: 15,
      status: 'active',
      date: '2025-03-15'
    },
    { 
      id: 2, 
      username: 'sara87', 
      email: 'sara@example.com',
      role: 'user',
      balance: 75,
      orders: 8,
      status: 'active',
      date: '2025-03-18'
    },
    { 
      id: 3, 
      username: 'mohamed22', 
      email: 'mohamed@example.com',
      role: 'user',
      balance: 200,
      orders: 22,
      status: 'active',
      date: '2025-03-20'
    },
    { 
      id: 4, 
      username: 'layla55', 
      email: 'layla@example.com',
      role: 'user',
      balance: 50,
      orders: 5,
      status: 'inactive',
      date: '2025-03-25'
    },
    { 
      id: 5, 
      username: 'omar44', 
      email: 'omar@example.com',
      role: 'user',
      balance: 0,
      orders: 0,
      status: 'active',
      date: '2025-04-01'
    },
    { 
      id: 6, 
      username: 'admin', 
      email: 'admin@example.com',
      role: 'admin',
      balance: 0,
      orders: 0,
      status: 'active',
      date: '2025-03-01'
    },
  ];

  const roleFilters = [
    { id: 'all', name: 'الكل' },
    { id: 'user', name: 'مستخدم' },
    { id: 'admin', name: 'مدير' },
  ];

  const filteredUsers = activeTab === 'all' 
    ? users 
    : users.filter(user => user.role === activeTab);

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
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      إدارة الطلبات
                    </Link>
                    <Link
                      href="/admin/users"
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
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
                    <h1 className="heading-lg mb-0">إدارة المستخدمين</h1>
                    <button className="btn-primary">إضافة مستخدم جديد</button>
                  </div>
                  <p className="text-gray-300">
                    إدارة حسابات المستخدمين في الموقع. يمكنك إضافة وتعديل وحذف المستخدمين وتغيير صلاحياتهم من هنا.
                  </p>
                </div>

                {/* Role Filter */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {roleFilters.map(filter => (
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

                {/* Users Table */}
                <div className="card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-right">الرقم</th>
                          <th className="py-3 px-4 text-right">اسم المستخدم</th>
                          <th className="py-3 px-4 text-right">البريد الإلكتروني</th>
                          <th className="py-3 px-4 text-right">الصلاحية</th>
                          <th className="py-3 px-4 text-right">الرصيد</th>
                          <th className="py-3 px-4 text-right">الطلبات</th>
                          <th className="py-3 px-4 text-right">الحالة</th>
                          <th className="py-3 px-4 text-right">تاريخ التسجيل</th>
                          <th className="py-3 px-4 text-right">الإجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((userData) => (
                          <tr key={userData.id} className="border-b border-border">
                            <td className="py-3 px-4">{userData.id}</td>
                            <td className="py-3 px-4">{userData.username}</td>
                            <td className="py-3 px-4">{userData.email}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                userData.role === 'admin' 
                                  ? 'bg-purple-900/20 text-purple-500' 
                                  : 'bg-blue-900/20 text-blue-500'
                              }`}>
                                {userData.role === 'admin' ? 'مدير' : 'مستخدم'}
                              </span>
                            </td>
                            <td className="py-3 px-4">${userData.balance}</td>
                            <td className="py-3 px-4">{userData.orders}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                userData.status === 'active' 
                                  ? 'bg-green-900/20 text-green-500' 
                                  : 'bg-red-900/20 text-red-500'
                              }`}>
                                {userData.status === 'active' ? 'مفعل' : 'معطل'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{userData.date}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2 space-x-reverse">
                                <button className="p-1 text-blue-500 hover:text-blue-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button className="p-1 text-green-500 hover:text-green-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
