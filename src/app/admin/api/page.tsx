'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminAPI() {
  const { user } = useAuth();
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
    const [apiKey, setApiKey] = useState('ad71f238b446279be1f10dd7bc91103acc8f5e84');

  // Mock API settings
  const apiSettings = {
    endpoint: 'https://api.smmservices.com/v1',
    provider: 'SMM Provider X',
    balance: 1250.75,
    status: 'connected'
  };

  const generateNewKey = () => {
    // In a real app, this would call an API to generate a new key
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
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
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
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
                  <h1 className="heading-lg mb-6">إعدادات API</h1>
                  <p className="text-gray-300 mb-4">
                    إدارة إعدادات API الخارجي لخدمات السوشيال ميديا. يمكنك تكوين الاتصال بمزود الخدمة وإدارة مفاتيح API من هنا.
                  </p>
                </div>

                {/* API Status */}
                <div className="card mb-8">
                  <h2 className="heading-md mb-6">حالة الاتصال</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-gray-400 mb-1">مزود الخدمة</p>
                      <p className="text-white text-lg">{apiSettings.provider}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">نقطة النهاية (Endpoint)</p>
                      <p className="text-white text-lg">{apiSettings.endpoint}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">الرصيد المتاح</p>
                      <p className="text-primary text-lg font-bold">${apiSettings.balance}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">حالة الاتصال</p>
                      <p className="text-green-500 text-lg">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        متصل
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 space-x-reverse">
                    <button className="btn-primary">تحديث الاتصال</button>
                    <button className="btn-secondary">إعادة شحن الرصيد</button>
                  </div>
                </div>

                {/* API Key Management */}
                <div className="card mb-8">
                  <h2 className="heading-md mb-6">مفتاح API</h2>
                  
                  <div className="mb-6">
                    <label className="block text-white mb-2">مفتاح API الحالي</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={apiKey}
                        readOnly
                        className="input-field flex-grow"
                      />
                      <button 
                        className="btn-secondary mr-2"
                        onClick={() => navigator.clipboard.writeText(apiKey)}
                      >
                        نسخ
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-800 rounded-md p-4 mb-6">
                    <p className="text-yellow-500">
                      <span className="font-bold">تحذير:</span> إنشاء مفتاح API جديد سيؤدي إلى إبطال المفتاح الحالي. تأكد من تحديث جميع التطبيقات التي تستخدم المفتاح الحالي.
                    </p>
                  </div>
                  
                  <button 
                    className="btn-primary"
                    onClick={generateNewKey}
                  >
                    إنشاء مفتاح جديد
                  </button>
                </div>

                {/* API Documentation */}
                <div className="card">
                  <h2 className="heading-md mb-6">توثيق API</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">نقاط النهاية المتاحة</h3>
                    
                    <div className="bg-card border border-border rounded-md p-4 mb-4">
                      <p className="text-primary font-bold mb-2">GET /services</p>
                      <p className="text-gray-400 mb-2">الحصول على قائمة الخدمات المتاحة</p>
                      <pre className="bg-background p-2 rounded-md overflow-x-auto">
                        <code className="text-gray-300">
                          {`curl -X GET "${apiSettings.endpoint}/services" \\
  -H "Authorization: Bearer ${apiKey}"`}
                        </code>
                      </pre>
                    </div>
                    
                    <div className="bg-card border border-border rounded-md p-4 mb-4">
                      <p className="text-primary font-bold mb-2">POST /orders</p>
                      <p className="text-gray-400 mb-2">إنشاء طلب جديد</p>
                      <pre className="bg-background p-2 rounded-md overflow-x-auto">
                        <code className="text-gray-300">
                          {`curl -X POST "${apiSettings.endpoint}/orders" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"service_id": 1, "link": "https://instagram.com/username", "quantity": 1000}'`}
                        </code>
                      </pre>
                    </div>
                    
                    <div className="bg-card border border-border rounded-md p-4">
                      <p className="text-primary font-bold mb-2">GET /orders/{'{order_id}'}</p>
                      <p className="text-gray-400 mb-2">الحصول على تفاصيل طلب محدد</p>
                      <pre className="bg-background p-2 rounded-md overflow-x-auto">
                        <code className="text-gray-300">
                          {`curl -X GET "${apiSettings.endpoint}/orders/12345" \\
  -H "Authorization: Bearer ${apiKey}"`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  <Link href="/admin/api/docs" className="btn-secondary">
                    عرض التوثيق الكامل
                  </Link>
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
