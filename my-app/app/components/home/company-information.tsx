'use client'

import { useState, useEffect } from "react";
import { MoreInformation } from "@/app/components/home/more-informations";

interface CompanyInfo {
  logo: string;
  name: string;
  description: string;
  isOpen: boolean;
  location: string;
  backgroundColor: string;
}

export function CompanyInformation() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanyInfo() {
      const response = await fetch('http://localhost:3000/api/company-info');
      const data: CompanyInfo = await response.json();
      setCompanyInfo(data);
      setIsLoading(false);
    }
    fetchCompanyInfo();
  }, []);

  if (isLoading) {
    return <div className="text-center text-lg animate-pulse">Carregando...</div>;
  }

  return (
    <div className={`relative flex flex-col items-center p-10 shadow-lg ${companyInfo?.backgroundColor}`}>
      <div className="flex items-center w-full">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 mr-4">
          <img
            src={companyInfo?.logo}
            alt="Company Logo"
            width={96}
            height={96}
            className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">{companyInfo?.name}</h1>
          <p className={`text-lg ${companyInfo?.isOpen ? 'text-green-300' : 'text-red-300'} tracking-wide`}>
            {companyInfo?.isOpen ? 'Aberto' : 'Fechado'}
          </p>
          <div className='flex text-white tracking-wide items-center'>
            <p className="text-lg">{companyInfo?.location}</p>
          </div>
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