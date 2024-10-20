"use client";

import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton"

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
    <>
      <div>
        <section>
          {stores.length > 0 ? (
            stores.map((store) => (
              <header
                key={store.id}
                style={{ backgroundColor: store.background_color || "#ffffff" }}
                className="flex flex-col items-center p-4 rounded-b shadow-md" 
              >
                <Avatar>
                  <AvatarImage className="rounded-full w-32 h-32" src={store.image_url} alt={store.name} />
                </Avatar>
                <h1 className="text-center font-semibold">{store.name}</h1> 
              </header>
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
        </section>
      </div>
    </>
  );

}
