// components/Sidebar.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CreateStore from './create.store';
import { SearchStore } from './search.store';
import CreateCategories from './create.category.store';

type ComponentsStore = 'create_store' | 'create_categories' | 'create_products' | 'create_featured_products' | 'qrcode' | 'payments';

const Sidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>();
  const [selectComponentStore, setSelectComponentStore] = useState<ComponentsStore>();
  const router = useRouter();

  const componentsClick = (section: ComponentsStore) => {
    setSelectComponentStore(section);
  };

  const handleToggle = (section: string) => {
    setActiveSection(activeSection === section ? undefined : section);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/doge_admin');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-full shadow-lg">
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
                    <h1
                      onClick={() => componentsClick('create_store')}
                      className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                      <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                      <span>Criar Loja</span>
                    </h1>
                  </li>
                  <li>
                    <h1
                      onClick={() => componentsClick('create_categories')}
                      className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                      <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                      <span>Criar/Relacionar Categorias</span>
                    </h1>
                  </li>
                  <li>
                    <h1
                      onClick={() => componentsClick('create_products')}
                      className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                      <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                      <span>Criar/Relacionar Produtos</span>
                    </h1>
                  </li>
                  <li>
                    <h1
                      onClick={() => componentsClick('create_featured_products')}
                      className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                      <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                      <span>Produtos Destaques</span>
                    </h1>
                  </li>
                </ul>
              </div>
            </li>
            {/* Gerador de QR Code */}
            <li>
              <div
                className="flex items-center justify-between p-4 text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleToggle('qrcode')}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined">qr_code_2</span>
                  <span>QR Code</span>
                </div>
                <span className="material-symbols-outlined transition-transform duration-500 ease-in-out transform">
                  {activeSection === 'qrcode' ? 'expand_more' : 'arrow_drop_down'}
                </span>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${activeSection === 'qrcode' ? 'max-h-[500px]' : 'max-h-0'}`}
              >
                <ul className="pl-4">
                  <li>
                    <h1 className="flex items-center space-x-2 p-2 text-white hover:bg-gray-600 cursor-pointer">
                      <span className="material-symbols-outlined">subdirectory_arrow_right</span>
                      <span>Gerar QR Code</span>
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
                className="flex p-items-center justify-between p-4 text-white hover:bg-gray-700 w-full text-left"
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
      {/* Content Area */}
      <div className="flex-1 ml-52 flex items-center justify-center pb-20 pt-10">
    {selectComponentStore === 'create_store' && <CreateStore />}
    {selectComponentStore === 'create_categories' && <CreateCategories />}
  </div>
    </div>
  );
};

export default Sidebar;