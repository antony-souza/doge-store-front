"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/app/components/doge_admin/sidebar';

export default function HomePage() {
  const [token, setToken] = useState<boolean>(true); // Inicialmente assume que há token
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setToken(false); // Se não há token, define como false
      setTimeout(() => {
        router.push('/doge_admin');
      }, 7000); // Redireciona após 7 segundos
    }
  }, [router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col">
        <Image src="/doge_token.png" width={300} height={300} alt="DogeAdmin Icon" />
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
