'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // This would be implemented with actual API calls in a real app
    alert('تم تحديث الملف الشخصي بنجاح');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقين');
      return;
    }
    
    // This would be implemented with actual API calls in a real app
    alert('تم تغيير كلمة المرور بنجاح');
    
    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

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
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
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
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
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
                  <h1 className="heading-lg mb-6">الملف الشخصي</h1>
                  <p className="text-gray-300 mb-4">
                    إدارة معلومات حسابك الشخصي وتغيير كلمة المرور.
                  </p>
                </div>

                {/* Profile Information */}
                <div className="card mb-8">
                  <h2 className="heading-md mb-6">المعلومات الشخصية</h2>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="username" className="block text-white mb-2">
                          اسم المستخدم
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="input-field"
                          disabled
                        />
                        <p className="text-gray-400 text-sm mt-1">لا يمكن تغيير اسم المستخدم</p>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-white mb-2">
                          البريد الإلكتروني
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="btn-primary">
                      حفظ التغييرات
                    </button>
                  </form>
                </div>

                {/* Change Password */}
                <div className="card">
                  <h2 className="heading-md mb-6">تغيير كلمة المرور</h2>
                  
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-4">
                      <label htmlFor="currentPassword" className="block text-white mb-2">
                        كلمة المرور الحالية
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-white mb-2">
                        كلمة المرور الجديدة
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-white mb-2">
                        تأكيد كلمة المرور الجديدة
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="btn-primary">
                      تغيير كلمة المرور
                    </button>
                  </form>
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
