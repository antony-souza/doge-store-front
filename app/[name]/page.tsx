"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PublicStoreService, { IParams, IStore } from "./services/store.public.service";
import { MoreInformation } from "../components/home/more-informations";

export default function PublicStore({ params }: { params: IParams }) {
  const { name } = params;
  const [stores, setStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [selectedStore, setSelectedStore] = useState<IStore | null>(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const storeService = new PublicStoreService();
        const response = await storeService.getPublicStore(name);

        console.log("Nome da loja enviado:", name);
        console.log("Resposta da API:", response);

        if (response && Array.isArray(response)) {
          setStores(response);
        } else {
          setStores([]);
        }
      } catch (error) {
        console.error("Erro ao buscar a loja:", error);
        setStores([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreInfo();
  }, [name]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-white">
        <h1 className="text-7xl animate-pulse">Carregando Lojas...</h1>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center text-rose-500">
        <h1 className="text-7xl animate-bounce">Nenhuma loja encontrada!</h1>
      </div>
    );
  }

  return (
    <div>
      {stores.map((store) => (
        <div
          key={store.id}
          className="relative flex w-full flex-col items-center p-7 mb-6 shadow-2xl"
          style={{ backgroundColor: store.background_color || "black" }}
        >
          <div className="flex flex-col md:flex-row items-center w-full">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 mb-4 md:mb-0 md:mr-4">
              <Image
                src={store.image_url || "https://i.imgur.com/XD57eVA.png"}
                alt="Logo da Loja"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white tracking-wide">
                {store.name || "Loja Não Encontrada"}
              </h1>
              <p className={`text-lg ${store.is_open ? "text-green-300" : "text-red-300"} tracking-wide`}>
                {store.is_open ? "Aberto" : "Fechado"}
              </p>
              <p className="text-lg text-white mt-2">
                {store.description || "Descrição não disponível."}
              </p>
              <button
                className="mt-2 px-2 py-1 bg-gray-300 text-white rounded text-sm hover:bg-green-500 tracking-wide"
                onClick={() => {
                  setSelectedStore(store);
                  setShowMoreInfo(true);
                }}
              >
                Mais Informações
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Componente MoreInformation para mostrar detalhes da loja */}
      {showMoreInfo && selectedStore && (
        <div className="fixed w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full animate-zoom-in">
            <MoreInformation store={selectedStore} />
            <Button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded tracking-wide"
              onClick={() => setShowMoreInfo(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
