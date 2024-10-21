"use client";

import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
    <div className="max-w-lg mx-auto">
      {stores.length > 0 ? (
        stores.map((store) => (
          <div key={store.id} className="relative mb-8">
            <section>
              <div
                className="w-full h-[150px] flex flex-col justify-center items-center"
                style={{
                  backgroundImage: `url('https://i.imgur.com/xfq8guy.jpeg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="bg-white w-full h-48" />
              <div className="absolute top-24 justify-center flex text-center items-center flex-col gap-2 w-full">
                <Avatar>
                  <AvatarImage
                    src={store.image_url}
                    alt={store.name}
                    className="rounded-full border-2 border-white w-28 h-28 bg-white p-1"
                  />
                </Avatar>
                <h1 className="text-2xl font-bold truncate">{store.name}</h1>
                <p className={`text-sm flex items-center gap-2 ${store.is_open ? 'text-green-500' : 'text-red-500'}`}>
                  {store.is_open ? 'Aberto agora' : 'Fechado no momento'}
                  <span className={`w-2 h-2 rounded-full ${store.is_open ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <p className="text-xs text-gray-500">
                    {store.is_open ? 'Fechamos às 22:30' : 'Abriremos às 17:30'}
                  </p>
                </p>
                <Button className="text-xs">Mais Informações</Button>
              </div>
            </section>
            <section className="mt-6 relative">
              <h1 className="ml-5">Lista de Categorias:</h1>
              <Carousel>
                <CarouselContent>
                  {store.category && store.category.length > 0 ? (
                    store.category.map((category) => (
                      <CarouselItem key={category.id} className="flex flex-col items-center w-1/3 p-2">
                        <Avatar>
                          <AvatarImage
                            src={category.image_url}
                            alt={category.name}
                            className="rounded-full w-16 h-16 object-cover bg-white p-1"
                          />
                        </Avatar>
                        <h2 className="text-lg font-semibold truncate text-center">{category.name}</h2>
                      </CarouselItem>
                    ))
                  ) : (
                    <p className="text-center">Nenhuma categoria disponível</p>
                  )}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
              </Carousel>
            </section>
            <section className="mt-6 relative">
              <h1 className="ml-5">Produtos em destaque:</h1>
              <Carousel>
                <CarouselContent>
                  {store.product && store.product.length > 0 ? (
                    store.product.map((product) => (
                      <CarouselItem key={product.id} className="flex flex-col items-center w-1/3 p-2">
                        <Avatar>
                          <AvatarImage
                            src={product.image_url}
                            alt={product.name}
                            className="rounded w-40 h-40 object-cover bg-white p-1"
                          />
                        </Avatar>
                        <h2 className="text-lg font-semibold truncate text-center">{product.name}</h2>
                        <p className="text-sm text-center">{product.description}</p>
                        <p className="text-sm text-center">R$ {product.price}</p>
                      </CarouselItem>
                    ))
                  ) : (
                    <p className="text-center">Nenhum produto disponível</p>
                  )}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
              </Carousel>
            </section>
          </div>
        ))
      ) : (
        <div className="flex flex-col space-y-3 justify-center items-center mt-6">
          <Skeleton className="h-[100px] w-[200px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      )}
    </div>
  );
}
