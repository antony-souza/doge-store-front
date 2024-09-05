"use client";

import { useState, useEffect } from "react";
import { MoreInformation } from "@/app/components/home/more-informations";
import Image from "next/image";

interface StoreInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  is_open: boolean;
  image_url: string;
  background_color: string;
}

interface Store {
  storeName: string;
}

export function CompanyInformation({ storeName }: Store) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanyInfo() {
      try {
        const response = await fetch(`http://localhost:4200/store/find?name=${encodeURIComponent(storeName)}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch store information');
        }

        const data = await response.json();
        const store = data[0];
        if (store && store.store_config.length > 0) {
          setCompanyInfo(store.store_config[0]); // Acessa o primeiro item em store_config
        } else {
          setCompanyInfo(null);
        }
      } catch (error) {
        console.error('Error fetching company information:', error);
        setCompanyInfo(null); // Em caso de erro, defina companyInfo como null
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanyInfo();
  }, [storeName]);

  if (isLoading) {
    return <div className="text-center text-lg animate-pulse">Carregando Loja...</div>;
  }

  if (!companyInfo) {
    return <div className="text-center text-lg text-red-600">Loja não encontrada.</div>;
  }

  return (
    <div className={`relative flex flex-col items-center p-10 shadow-lg`} style={{ backgroundColor: companyInfo.background_color }}>
      <div className="flex flex-col md:flex-row items-center w-full">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 mb-4 md:mb-0 md:mr-4">
  <Image
    src={companyInfo.image_url}
    alt="Company Logo"
    layout="fill" // Preenche todo o contêiner
    objectFit="cover" // Garante que a imagem cubra o espaço sem distorção
    className="object-cover"
    priority
  />
</div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white tracking-wide">{storeName}</h1>
          <p className={`text-lg ${companyInfo.is_open ? 'text-green-300' : 'text-red-300'} tracking-wide`}>
            {companyInfo.is_open ? 'Aberto' : 'Fechado'}
          </p>
          <div className='flex text-white tracking-wide items-center justify-center md:justify-start'>
            <p className="text-lg">{companyInfo.address}</p>
          </div>
          <p className="text-lg text-white mt-2">{companyInfo.description}</p>
          <button
            className="mt-2 px-2 py-1 bg-gray-300 text-white rounded text-sm hover:bg-green-500 tracking-wide"
            onClick={() => setShowMoreInfo(true)}
          >
            Mais Informações
          </button>
        </div>
      </div>

      {showMoreInfo && (
        <div className="fixed w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full animate-zoom-in">
            <MoreInformation />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded tracking-wide"
              onClick={() => setShowMoreInfo(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
