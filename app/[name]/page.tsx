"use client";
import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatPrice } from "../util/formt-price";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { ICategory } from "../doge_client/services/user.service";
import { Copyright } from "./cop";

export default function PublicPage({ params }: IPublicPageProps) {
  const { name } = params;
  const [stores, setStores] = useState<IStore[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [moreInfo, setMoreInfo] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      const fetchPublicStore = async () => {
        try {
          const publicStoreService = new PublicStoreService();
          const response = await publicStoreService.getPublicStore(name);
          setStores(response);
          setCategory(response[0].category);
        } catch (error) {
          toast({
            title: "Erro - Loja não encontrada",
            description: "Erro ao buscar a loja. Verifique o link ou tente novamente mais tarde. Se persistir o erro, entre em contato com o suporte.",
            variant: "destructive",
          })
        }
      };
      fetchPublicStore();
    }
  }, [name]);

  return (
    <div>
      <Toaster />
      {stores.length > 0 ? (
        stores.map((store) => (
          <div key={store.id} className="relative mb-12">
            <section className="bg-gradient-to-b from-gray-100 to-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <div
                  className="w-full h-[200px] flex flex-col justify-center items-center rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url('${store.banner_url || ''}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <div className="text-center -mt-20 flex flex-col justify-center items-center">
                <Avatar>
                  <AvatarImage
                    src={store.image_url}
                    alt={store.name}
                    className="rounded-full border-4 border-white w-28 h-28 bg-white"
                  />
                </Avatar>
                <h1 className="text-3xl font-bold mt-4 text-gray-800">{store.name}</h1>
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <p className={`text-lg flex items-center ${store.is_open ? 'text-green-500' : 'text-red-500'}`}>
                      {store.is_open ? 'Aberto agora' : 'Fechado no momento'}
                      <span
                        className={`ml-2 w-2 h-2 inline-block rounded-full ${store.is_open ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                    </p>
                  </div>

                  <Button variant="outline" className="mt-4" onClick={() => setMoreInfo(!moreInfo)}>
                    <span className="material-symbols-outlined">
                      info
                    </span>
                    Mais Informações
                  </Button>
                  {moreInfo && (
                    <div className="flex flex-col justify-start mt-4 items-start">
                      <div className="flex flex-row flex-wrap items-center gap-2">
                        <span className="material-symbols-outlined">
                          description
                        </span>
                        <p className="font-bold text-gray-800 text-center">Descrição:</p>
                        <p className="text-gray-600">{store.description}</p>
                      </div>
                      <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                        <span className="material-symbols-outlined">
                          home
                        </span>
                        <p className="font-bold text-gray-800">Endereço:</p>
                        <p className="text-gray-600">{store.address}</p>
                      </div>
                      <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                        <span className="material-symbols-outlined">
                          call
                        </span>
                        <p className="font-bold text-gray-800">Contato:</p>
                        <p className="text-gray-600">{store.phone}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </section>
            <section>
              {category.length > 0 ? (
                <section className="bg-gray-100 p-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-6">Categorias</h1>
                    {/* Contêiner com overflow para deslizar as categorias */}
                    <div className="overflow-x-auto">
                      <div
                        className="grid grid-flow-col gap-4"
                        style={{
                          gridAutoColumns: "minmax(125px, 1fr)"
                        }}
                      >
                        {category.map((cat) => (
                          <div key={cat.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
                            <Avatar>
                              <AvatarImage
                                src={cat.image_url}
                                alt={cat.name}
                                className="rounded-lg w-20 h-20 object-cover"
                              />
                            </Avatar>
                            <h2 className="font-semibold mt-2">{cat.name}</h2>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className="flex justify-center items-center h-20">
                  <Skeleton className="h-3 w-20" />
                </div>
              )}
            </section>
            <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold mb-6">Produtos em destaque</h1>

              <div className="relative">
                {/* Contêiner com overflow para deslizar */}
                <div className="overflow-x-auto">
                  <div
                    className="grid grid-flow-col gap-8"
                    style={{
                      gridAutoColumns: "minmax(250px, 1fr)",
                    }}
                  >
                    {store.product && store.product.length > 0 ? (
                      store.product
                        .filter((product) => product.featured_products)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between w-full"
                          >
                            <div className="flex flex-col items-center">
                              <Avatar>
                                <AvatarImage
                                  src={product.image_url}
                                  alt={product.name}
                                  className="rounded-lg w-40 h-40 object-cover"
                                />
                              </Avatar>
                              <h2 className="text-xl font-bold text-center mt-4">
                                {product.name}
                              </h2>
                              <p className="text-lg font-semibold text-center text-green-600 mt-2">
                                {formatPrice(product.price)}
                              </p>
                              <p className="text-gray-600 text-center mt-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="mt-4 flex justify-center flex-col gap-4">
                              <Button>
                                <span className="material-symbols-outlined">
                                  shopping_cart
                                </span>
                                Adicionar ao Carrinho
                              </Button>
                              <Button variant="outline">Detalhes</Button>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-center">Nenhum produto em destaque disponível</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold mb-6">Produtos</h1>
              <div className="overflow-x-auto">
                <div
                  className="grid grid-flow-col gap-8"
                  style={{
                    gridAutoColumns: "minmax(250px, 1fr)",
                  }}
                >
                  {store.product && store.product.length > 0 ? (
                    store.product.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between w-full"
                      >
                        <div className="flex flex-col items-center">
                          <Avatar>
                            <AvatarImage
                              src={product.image_url}
                              alt={product.name}
                              className="rounded-lg w-40 h-40 object-cover"
                            />
                          </Avatar>
                          <h2 className="text-xl font-bold text-center mt-4">
                            {product.name}
                          </h2>
                          <p className="text-lg font-semibold text-cente mt-2">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-gray-600 text-center mt-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-center flex-col gap-4">
                          <Button>
                            <span className="material-symbols-outlined">
                              shopping_cart
                            </span>
                            Adicionar ao Carrinho
                          </Button>
                          <Button variant="outline">Detalhes</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">Nenhum produto em destaque disponível</p>
                  )}
                </div>
              </div>
            </section>
            <Copyright />
          </div>
        ))
      ) : (
        <div className="flex flex-col space-y-3 justify-center items-center h-screen">
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
