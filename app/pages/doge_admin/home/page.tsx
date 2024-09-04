"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/doge_admin/sidebar';

export default function HomePage(): React.ReactElement {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/pages/doge_admin'); 
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
    </div>
  );
}
