'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Register() {
  const { register, user, isLoading } = useAuth();
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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const agreeTerms = formData.get('agreeTerms') === 'on';
    
    if (!agreeTerms) {
      alert('يجب الموافقة على الشروط والأحكام');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }
    
    const success = await register(username, email, password);
    
    if (success) {
      // Redirect will happen automatically due to the useEffect above
    } else {
      alert('اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل');
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="section flex-grow flex items-center justify-center">
        <div className="container max-w-md">
          <div className="card">
            <h1 className="heading-lg text-center mb-8">إنشاء حساب جديد</h1>

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

              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field"
                  placeholder="أدخل البريد الإلكتروني"
                  required
                />
              </div>

              <div className="mb-4">
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

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-white mb-2">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="أعد إدخال كلمة المرور"
                  required
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  required
                />
                <label htmlFor="agreeTerms" className="mr-2 block text-sm text-gray-300">
                  أوافق على <Link href="/terms" className="text-primary hover:text-primary/80">الشروط والأحكام</Link>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full mb-4"
                disabled={isLoading}
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </button>

              <p className="text-center text-gray-400">
                لديك حساب بالفعل؟{' '}
                <Link href="/login" className="text-primary hover:text-primary/80">
                  تسجيل الدخول
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
