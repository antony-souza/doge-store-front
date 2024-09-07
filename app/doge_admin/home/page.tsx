"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Sidebar from '@/app/components/doge_admin/sidebar';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  expirationTime: number; // 
}

export default function HomePage() {
  const [token, setToken] = useState<boolean>(true); 
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    // Função para verificar se o token expirou
    const isTokenExpired = (token: string): boolean => {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decoded.expirationTime < currentTime; 
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; // Se houver algum erro ao decodificar, assume que está expirado
      }
    };

    if (!storedToken || isTokenExpired(storedToken)) {
      localStorage.removeItem('token'); 
      setToken(false); 
      setTimeout(() => {
        router.push('/doge_admin')
      }, 7000);
    }
  }, [router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 flex-col text-center gap-5">
        <Image src="/doge_token.png" width={300} height={300} alt="DogeAdmin Icon" className='animate-bounce'/>
        <h1 className="text-white text-6xl font-bold">Token não encontrado!</h1>
        <h1 className="text-white text-4xl font-bold">Será chutado ao login espertinho!</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
    </div>
  );
}
