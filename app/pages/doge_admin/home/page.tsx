"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/doge_admin/sidebar';

export default function HomePage() {
  const [token, setToken] = useState(true); // Assume que tem token inicialmente
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setToken(false); // Se não tem token, define como false(Entendimento)
      setTimeout(() => {
        router.push('/pages/doge_admin');
      }, 7000); // 7000ms = 7 segundos
    }
  }, [router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col">
        <h1 className="text-white text-6xl font-bold">Token não encontrado</h1>
        <h1 className="text-white text-4xl font-bold">Será redirecionado ao login!</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
    </div>
  );
}
