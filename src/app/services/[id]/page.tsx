'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function ServiceOrderPage({ params }) {
  const { user } = useAuth();
  const router = useRouter();
  const serviceId = params?.id;
  const [formData, setFormData] = useState({
    link: '',
    quantity: 1000,
    comments: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock service data for demonstration
  // In a real app, this would be fetched from an API based on serviceId
  const service = {
    id: serviceId,
    name: 'متابعين انستاجرام عرب',
    description: 'متابعين انستاجرام عرب حقيقيين 100% وآمنين تمامًا على حسابك. يبدأ التنفيذ فورًا ويكتمل خلال 24 ساعة.',
    price: 0.025, // per unit
    minOrder: 100,
    maxOrder: 10000,
    category: 'instagram',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) || '' : value,
    });
  };

  const calculateTotal = () => {
    return (formData.quantity * service.price).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user has enough balance
    const total = calculateTotal();
    const userBalance = 100; // Mock balance, in a real app this would come from user data
    
    if (parseFloat(total) > userBalance) {
      alert('رصيدك غير كافي لإتمام هذا الطلب. يرجى شحن رصيدك أولاً.');
      setIsLoading(false);
      return;
    }
    
    // Create order
    // In a real app, this would be an API call
    console.log('Creating order:', {
      service: service.id,
      link: formData.link,
      quantity: formData.quantity,
      comments: formData.comments,
      total: total,
    });
    
    // Redirect to success page
    router.push('/dashboard/orders?success=true');
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col">
        <Navbar />

        <section className="section">
          <div className="container max-w-4xl mx-auto">
            <div className="card mb-8">
              <h1 className="heading-lg mb-2">{service.name}</h1>
              <p className="text-gray-300 mb-6">{service.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Details */}
                <div>
                  <h2 className="heading-md mb-4">تفاصيل الخدمة</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">السعر لكل 1000</span>
                      <span className="text-primary font-bold">${(service.price * 1000).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">الحد الأدنى للطلب</span>
                      <span className="text-white">{service.minOrder}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">الحد الأقصى للطلب</span>
                      <span className="text-white">{service.maxOrder}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">وقت التنفيذ المتوقع</span>
                      <span className="text-white">24 ساعة</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-md">
                    <p className="text-primary">
                      <span className="font-bold">ملاحظة:</span> تأكد من أن الحساب عام وليس خاص لضمان تنفيذ الطلب بنجاح.
                    </p>
                  </div>
                </div>
                
                {/* Order Form */}
                <div>
                  <h2 className="heading-md mb-4">طلب الخدمة</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="link" className="block text-white mb-2">
                        الرابط
                      </label>
                      <input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="https://instagram.com/username"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="quantity" className="block text-white mb-2">
                        الكمية
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="input-field"
                        min={service.minOrder}
                        max={service.maxOrder}
                        required
                      />
                      <p className="text-gray-400 text-sm mt-1">
                        الحد الأدنى: {service.minOrder} | الحد الأقصى: {service.maxOrder}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="comments" className="block text-white mb-2">
                        ملاحظات (اختياري)
                      </label>
                      <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        className="input-field min-h-[100px]"
                        placeholder="أي ملاحظات إضافية للطلب"
                      />
                    </div>
                    
                    <div className="bg-card p-4 rounded-md mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white">المجموع</span>
                        <span className="text-2xl text-primary font-bold">${calculateTotal()}</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'جاري تنفيذ الطلب...' : 'تأكيد الطلب'}
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
