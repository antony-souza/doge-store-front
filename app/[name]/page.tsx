"use client";

import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PublicPage({ params }: IPublicPageProps) {
  const { name } = params;
  const [stores, setStores] = useState<IStore[]>([]);

  useEffect(() => {
    if (name) {
      const fetchPublicStore = async () => {
        try {
          const publicStoreService = new PublicStoreService();
          const response = await publicStoreService.getPublicStore(name);
          setStores(response);

          console.log("Resposta da API:", response);
        } catch (error) {
          console.error("Erro ao buscar a loja:", error);
        }
      };
      fetchPublicStore();
    }
  }, [name]);

  return (
    <div>
      {stores.length > 0 ? (
        stores.map((store) => (
          <div key={store.id}>
            <div
              className="w-full h-[200px] flex flex-col justify-center items-center"
              style={{
                backgroundImage: `url('https://i.imgur.com/xfq8guy.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="bg-white w-full h-52" />
            <div className="absolute top-32 justify-center flex text-center items-center flex-col gap-3 w-full">
              <Avatar>
                <AvatarImage src={store.image_url}
                  alt={store.name}
                  className="rounded-full border-2 border-white w-32 h-32 bg-white p-1" />
              </Avatar>
              <h1 className="text-3xl font-bold">{store.name}</h1>
              <p className={`text-sm flex items-center gap-2 ${store.is_open ? 'text-green-500' : 'text-red-500'}`}>
                {store.is_open ? 'Aberto agora' : 'Fechado no momento'}
                <span className={`w-2 h-2 rounded-full ${store.is_open ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <p className="text-sm text-gray-500">{store.is_open ? 'Fechamos ás 22:30' : 'Abriremos ás 17:30'}</p>
              </p>
              <Button>Mais Informações</Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col space-y-3 justify-center items-center mt-10">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}
    </div>
  );
}
