'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('vodafone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock payment data from URL params or state management in a real app
  const paymentData = {
    amount: 100,
    reference: 'REF-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    date: new Date().toISOString().split('T')[0]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    router.push('/dashboard/payment/success?ref=' + paymentData.reference);
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="section">
          <div className="container max-w-2xl mx-auto">
            <div className="card mb-8">
              <h1 className="heading-lg mb-6">إتمام عملية الدفع</h1>
              <p className="text-gray-300 mb-4">
                يرجى اختيار طريقة الدفع وإدخال البيانات المطلوبة لإتمام عملية شحن الرصيد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Payment Summary */}
              <div className="md:col-span-1">
                <div className="card">
                  <h2 className="heading-md mb-6">ملخص الدفع</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400">المبلغ</p>
                      <p className="text-2xl text-primary font-bold">${paymentData.amount}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">رقم المرجع</p>
                      <p className="text-white">{paymentData.reference}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">التاريخ</p>
                      <p className="text-white">{paymentData.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2">
                <div className="card">
                  <h2 className="heading-md mb-6">اختر طريقة الدفع</h2>
                  
                  {/* Payment Methods */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      className={`p-4 rounded-md border-2 flex flex-col items-center justify-center transition-all ${
                        paymentMethod === 'vodafone' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('vodafone')}
                    >
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold">V</span>
                      </div>
                      <span className="text-white">فودافون كاش</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`p-4 rounded-md border-2 flex flex-col items-center justify-center transition-all ${
                        paymentMethod === 'orange' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('orange')}
                    >
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-bold">O</span>
                      </div>
                      <span className="text-white">أورانج كاش</span>
                    </button>
                  </div>
                  
                  {/* Payment Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-white mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="input-field"
                        placeholder="أدخل رقم الهاتف"
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">
                        سيتم إرسال طلب الدفع إلى هذا الرقم
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 border border-primary/30 rounded-md p-4 mb-6">
                      <p className="text-primary">
                        <span className="font-bold">ملاحظة:</span> بعد النقر على "تأكيد الدفع"، ستتلقى إشعارًا على هاتفك لتأكيد عملية الدفع.
                      </p>
                    </div>
                    
                    <div className="flex space-x-4 space-x-reverse">
                      <button
                        type="submit"
                        className="btn-primary flex-grow"
                        disabled={isLoading}
                      >
                        {isLoading ? 'جاري المعالجة...' : 'تأكيد الدفع'}
                      </button>
                      
                      <Link href="/dashboard/balance" className="btn-secondary">
                        إلغاء
                      </Link>
                    </div>
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
