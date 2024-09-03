// components/Sidebar.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>();
  const router = useRouter();

  const handleToggle = (section: string) => {
    setActiveSection(activeSection === section ? undefined : section);
  };

  const handleLogout = () => {
    // Lógica de logout
    // e então redirecionar para a página de login
    router.push('/pages/doge_admin');//usar um obj de rotas
  };

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 h-full shadow-lg">
      <div className="flex items-center p-4 border-b border-gray-700">
        {/* Container para a imagem e o texto */}
        <div className="flex items-center flex-col justify-center">
          <Image src="/icon.png" width={300} height={300} alt="DogeAdmin Icon" className="object-cover" />
          <h1 className="text-white text-2xl font-bold mt-2">Doge Admin</h1>
        </div>
      </div>
      <nav className="mt-6">
        <ul>
          {/* Store */}
          <li>
            <div 
              className="flex items-center justify-between p-4 text-white hover:bg-gray-700 cursor-pointer" 
              onClick={() => handleToggle('store')}
            >
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined">storefront</span>
                <span>Lojas</span>
              </div>
              <span className="material-symbols-outlined transition-transform duration-500 ease-in-out transform">
                {activeSection === 'store' ? 'expand_more' : 'arrow_drop_down'}
              </span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${activeSection === 'store' ? 'max-h-[500px]' : 'max-h-0'}`}
            >
              <ul className="pl-4">
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Criar Loja & Relações</span>
                  </h1>
                </li>
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Gerenciar Lojas</span>
                  </h1>
                </li>
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Editar Loja</span>
                  </h1>
                </li>
              </ul>
            </div>
          </li>
          {/* Payments */}
          <li>
            <div 
              className="flex items-center justify-between p-4 text-white hover:bg-gray-700 cursor-pointer" 
              onClick={() => handleToggle('charts')}
            >
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined">payments</span>
                <span>Pagamentos - OFF</span>
              </div>
              <span className="material-symbols-outlined transition-transform duration-500 ease-in-out transform">
                {activeSection === 'charts' ? 'expand_more' : 'arrow_drop_down'}
              </span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${activeSection === 'charts' ? 'max-h-[500px]' : 'max-h-0'}`}
            >
              <ul className="pl-4">
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Pagamentos Pendentes</span>
                  </h1>
                </li>
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Histórico de Pagamentos</span>
                  </h1>
                </li>
                <li>
                  <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                    <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                    <span>Faturamento</span>
                  </h1>
                </li>
              </ul>
            </div>
          </li>
          {/* Logout Button */}
          <li>
            <button 
              onClick={handleLogout} 
              className="flex items-center justify-between p-4 text-white hover:bg-gray-700 w-full text-left"
            >
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined">logout</span>
                <span>Sair</span>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
