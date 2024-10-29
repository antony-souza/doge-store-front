'use client';
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { IStore } from "@/app/util/interfaces-global.service";
import UserService from "@/app/doge_client/services/user.service";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const StoreInfo = () => {
    const [stores, setStores] = useState<IStore[]>([]);
    const [moreInfo, setMoreInfo] = useState<boolean>(false);

    useEffect(() => {
        const fetchPublicStore = async () => {
            try {
                const publicStoreService = new UserService();
                const id = localStorage.getItem("store_id") as string;
                const response = await publicStoreService.getStore(id);
                setStores([response]);
            } catch (error) {
                toast({
                    title: "Erro - Loja não encontrada",
                    description: "Erro ao buscar a loja. Verifique o link ou tente novamente mais tarde. Se persistir o erro, entre em contato com o suporte.",
                    variant: "destructive",
                });
            }
        };
        fetchPublicStore();
    }, []);

    return (
        <>
            <Toaster />
            <div className="relative mb-12">
                {stores.map((store) => (
                    <section key={store.id} className="bg-white p-6 rounded-lg shadow-lg">
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
                                    <span className="material-symbols-outlined">info</span>
                                    Mais Informações
                                </Button>
                                {moreInfo && (
                                    <div className="flex flex-col justify-start mt-4 items-start">
                                        <div className="flex flex-row flex-wrap items-center gap-2">
                                            <span className="material-symbols-outlined">description</span>
                                            <p className="font-bold text-gray-800 text-center">Descrição:</p>
                                            <p className="text-gray-600">{store.description}</p>
                                        </div>
                                        <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                                            <span className="material-symbols-outlined">home</span>
                                            <p className="font-bold text-gray-800">Endereço:</p>
                                            <p className="text-gray-600">{store.address}</p>
                                        </div>
                                        <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                                            <span className="material-symbols-outlined">call</span>
                                            <p className="font-bold text-gray-800">Contato:</p>
                                            <p className="text-gray-600">{store.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
};

export default StoreInfo;
