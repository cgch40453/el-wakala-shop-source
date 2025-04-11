'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Login() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('rememberMe') === 'on';
    
    const success = await login(username, password);
    
    if (success) {
      // Redirect will happen automatically due to the useEffect above
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="section flex-grow flex items-center justify-center">
        <div className="container max-w-md">
          <div className="card">
            <h1 className="heading-lg text-center mb-8">تسجيل الدخول</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white mb-2">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input-field"
                  placeholder="أدخل اسم المستخدم"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-white mb-2">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-field"
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="rememberMe" className="mr-2 block text-sm text-gray-300">
                    تذكرني
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full mb-4"
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>

              <p className="text-center text-gray-400">
                ليس لديك حساب؟{' '}
                <Link href="/register" className="text-primary hover:text-primary/80">
                  إنشاء حساب جديد
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
