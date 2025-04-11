'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // If adminOnly and user is not admin, redirect to dashboard
    if (adminOnly && user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    // User is authorized
    setIsAuthorized(true);
  }, [user, adminOnly, router]);

  // Show nothing while checking authorization
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-2xl">جاري التحميل...</div>
      </div>
    );
  }

  return <>{children}</>;
}
