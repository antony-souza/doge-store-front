'use client'
import Image from "next/image";
import { useState } from "react";
import { MoreInformation } from "@/app/components/home/more-informations";

export function CompanyInformation() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="relative flex flex-col items-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-4">
      <div className="flex items-center w-full">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 mr-4">
          <Image
            src="/mexi.jpg"
            alt="Company Logo"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Doge Tacos</h1>
          <p className="text-lg text-green-300">Aberto</p> {/* ou text-red-300 para "Fechado" */}
          <div className='flex text-white'>
            <p className="text-lg">Juazeiro-BA</p>
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <button
            className="mt-2 px-2 py-1 bg-gray-300 text-white rounded text-sm hover:bg-green-500"
            onClick={() => setShowMoreInfo(true)}
          >
            Mais Informações
          </button>
        </div>
      </div>
      {showMoreInfo && (
        <div className="fixed w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
            <MoreInformation />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
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