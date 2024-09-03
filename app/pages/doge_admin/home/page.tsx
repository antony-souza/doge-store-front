// app/page.tsx
"use client";
import Sidebar from '@/app/components/doge_admin/sidebar';
import React from 'react';

export default function HomePage(): React.ReactElement {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-white">Home Page</h1>
        <p className="mt-4 text-gray-400">Bem Vindo Meu Nobre!.</p>
        {/* Add more content here */}
      </div>
    </div>
  );
}
