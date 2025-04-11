'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function UserBalance() {
  const { user } = useAuth();
  const router = useRouter();
  const [amount, setAmount] = useState('');

  // Mock balance data for demonstration
  const balanceData = {
    current: 75.50,
    transactions: [
      { 
        id: 'TRX-1001', 
        type: 'deposit',
        amount: 100,
        method: 'فودافون كاش',
        status: 'completed',
        date: '2025-04-01'
      },
      { 
        id: 'TRX-1002', 
        type: 'order',
        amount: -25,
        order_id: 'ORD-1001',
        status: 'completed',
        date: '2025-04-05'
      },
      { 
        id: 'TRX-1003', 
        type: 'deposit',
        amount: 50,
        method: 'أورانج كاش',
        status: 'pending',
        date: '2025-04-10'
      },
      { 
        id: 'TRX-1004', 
        type: 'order',
        amount: -12,
        order_id: 'ORD-1002',
        status: 'completed',
        date: '2025-04-08'
      },
      { 
        id: 'TRX-1005', 
        type: 'order',
        amount: -75,
        order_id: 'ORD-1003',
        status: 'pending',
        date: '2025-04-10'
      },
    ]
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would be implemented in the payment integration step
    console.log('Deposit amount:', amount);
    alert('سيتم تحويلك إلى صفحة الدفع');
  };

  const getTransactionTypeText = (type) => {
    switch(type) {
      case 'deposit': return 'إيداع';
      case 'order': return 'طلب';
      case 'withdrawal': return 'سحب';
      default: return type;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-900/20 text-green-500';
      case 'processing': return 'bg-blue-900/20 text-blue-500';
      case 'pending': return 'bg-yellow-900/20 text-yellow-500';
      case 'cancelled': return 'bg-red-900/20 text-red-500';
      default: return 'bg-gray-900/20 text-gray-500';
    }
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
                      className="block py-2 px-4 rounded-md bg-primary/20 text-primary"
                    >
                      رصيدي
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="block py-2 px-4 rounded-md hover:bg-card text-white"
                    >
                      الملف الشخصي
                    </Link>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="card mb-8">
                  <h1 className="heading-lg mb-6">رصيدي</h1>
                  <p className="text-gray-300 mb-4">
                    إدارة رصيدك وعرض سجل المعاملات. يمكنك شحن رصيدك من هنا لاستخدامه في طلب الخدمات.
                  </p>
                </div>

                {/* Balance Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="card">
                    <h2 className="heading-md mb-4">الرصيد الحالي</h2>
                    <p className="text-4xl text-primary font-bold mb-6">${balanceData.current}</p>
                    <Link href="#deposit-form" className="btn-primary w-full text-center">
                      شحن الرصيد
                    </Link>
                  </div>

                  {/* Deposit Form */}
                  <div className="card" id="deposit-form">
                    <h2 className="heading-md mb-4">شحن الرصيد</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="amount" className="block text-white mb-2">
                          المبلغ ($)
                        </label>
                        <input
                          type="number"
                          id="amount"
                          value={amount}
                          onChange={handleAmountChange}
                          className="input-field"
                          placeholder="أدخل المبلغ"
                          min="10"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="payment-method" className="block text-white mb-2">
                          طريقة الدفع
                        </label>
                        <select
                          id="payment-method"
                          className="input-field"
                          required
                        >
                          <option value="">اختر طريقة الدفع</option>
                          <option value="vodafone">فودافون كاش</option>
                          <option value="orange">أورانج كاش</option>
                          <option value="bank">تحويل بنكي</option>
                        </select>
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        متابعة الدفع
                      </button>
                    </form>
                  </div>
                </div>

                {/* Transactions History */}
                <div className="card">
                  <h2 className="heading-md mb-6">سجل المعاملات</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="py-3 px-4 text-right">رقم المعاملة</th>
                          <th className="py-3 px-4 text-right">النوع</th>
                          <th className="py-3 px-4 text-right">المبلغ</th>
                          <th className="py-3 px-4 text-right">التفاصيل</th>
                          <th className="py-3 px-4 text-right">الحالة</th>
                          <th className="py-3 px-4 text-right">التاريخ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {balanceData.transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-border">
                            <td className="py-3 px-4">{transaction.id}</td>
                            <td className="py-3 px-4">{getTransactionTypeText(transaction.type)}</td>
                            <td className="py-3 px-4">
                              <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}$
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {transaction.type === 'deposit' && transaction.method}
                              {transaction.type === 'order' && (
                                <Link href={`/dashboard/orders/${transaction.order_id}`} className="text-primary">
                                  {transaction.order_id}
                                </Link>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(transaction.status)}`}>
                                {getStatusText(transaction.status)}
                              </span>
                            </td>
                            <td className="py-3 px-4">{transaction.date}</td>
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
