'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get('ref') || 'UNKNOWN';
  
  // In a real app, we would verify the payment status from the server
  useEffect(() => {
    // Simulate payment verification
    const verifyPayment = async () => {
      // This would be an API call in a real app
      console.log('Verifying payment:', reference);
    };
    
    verifyPayment();
  }, [reference]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="section">
          <div className="container max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="heading-lg mb-4">تمت عملية الدفع بنجاح!</h1>
              
              <p className="text-gray-300 text-lg mb-6">
                تم شحن رصيدك بنجاح. يمكنك الآن استخدام الرصيد لطلب خدمات السوشيال ميديا.
              </p>
              
              <div className="bg-card p-4 rounded-md inline-block mx-auto mb-8">
                <p className="text-gray-400 mb-1">رقم المرجع</p>
                <p className="text-primary text-xl font-bold">{reference}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/dashboard/balance" className="btn-primary">
                  العودة إلى الرصيد
                </Link>
                
                <Link href="/services" className="btn-secondary">
                  تصفح الخدمات
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
}
