"use client";

import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

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
              <header key={store.id}>
                <Avatar>
                  <AvatarImage src={store.image_url} alt={store.name} />
                </Avatar>
              </header>
            ))
          ) : (
            <h1>Loja não encontrada</h1>
          )}
        </section>
      </div>
    </>
  );
}
