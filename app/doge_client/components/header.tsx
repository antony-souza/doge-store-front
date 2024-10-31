"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserService, { IUserLocalStorage } from "../services/user.service";
import { IStore } from "@/app/util/interfaces-global.service";
import { routes } from "@/router";

const HeaderClient: React.FC = () => {
    const [user, setUser] = useState<IUserLocalStorage>();
    const [store, setStore] = useState<IStore>();
    const { replace } = useRouter();

    useEffect(() => {
        const userService = new UserService();
        const user = userService.getUserStorage();
        if (user) {
            setUser(user);
        }
    }, []);

    useEffect(() => {
        const fetchStore = async () => {
            const userService = new UserService();
            try {
                const id = localStorage.getItem("store_id") as string;
                const store = await userService.getStore(id);
                setStore(store);
            } catch (error) {
                console.error("Erro ao buscar loja:", error);
            }
        };

        fetchStore();
    }, []);

    const setProfileUrl = (imageUrl?: string) => {
        return imageUrl || "https://i.imgur.com/LGT9cVS.png";
    };

    const exitSystem = () => {
        const userService = new UserService();
        userService.removeUserStorage();
        replace(routes.LOGIN);
    };

    const handleEditClick = () => {
        replace(routes.PROFILE);
    };

    return (
        <div className="flex justify-center text-slate-950">
            <header className="w-full h-16 bg-white flex items-center justify-between p-4 rounded-b border border-gray-300 shadow-md fixed z-10">
                <div className="flex items-center">
                    {/* Nome da loja com fallback */}
                    <h1 className="text-xl font-bold text-gray-700">
                        {store?.name || "DogeStore"}
                    </h1>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center space-x-3 cursor-pointer">
                            {/* Nome do usuário */}
                            {user && <span className="text-gray-700 font-medium">{user.name || 'Sem nome'}</span>}

                            <Avatar className="border-2 border-gray-700">
                                {/* Imagem do perfil */}
                                {user && (
                                    <AvatarImage src={setProfileUrl(user.imageUrl)} alt="Profile User" />
                                )}
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-auto text-slate-600 z-20">
                        <DropdownMenuItem className="cursor-pointer flex gap-2" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">edit</span>
                            <span>Editar Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex gap-2" onClick={exitSystem}>
                            <span className="material-symbols-outlined">logout</span>
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </div>
    );
};

export default HeaderClient;
