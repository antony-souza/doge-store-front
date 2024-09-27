"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dashboard from "../components/dashbourd";
import HeaderClient from "../components/header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import EditStore from "../components/editStore";
import { IStore } from "@/app/util/interfaces-global.service";
import UserService from "../services/user.service";

export default function RenderStorePage() {
    const [store, setStore] = useState<IStore | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getStore();
                setStore(response); 
            } catch (error) {
                console.error("Erro ao buscar a loja:", error);
            }
        };

        fetchStore();
    }, []); // Executa apenas uma vez ao montar o componente

    const handleEditStore = () => {
        setIsEditModalOpen(true); 
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false); 
    };

    return (
        <>
            <HeaderClient />
            <div className="flex justify-center items-start px-4 py-8 bg-gray-100">
                <div className="w-full max-w-6xl bg-white shadow-2xl border border-gray-200 rounded-lg overflow-x-auto p-6">
                    <div className="flex justify-between pb-2">
                        <h1 className="text-2xl font-semibold">{`Informações`}</h1>
                        <Button className="flex gap-2" onClick={handleEditStore}>
                            <span className="material-symbols-outlined">draw</span>
                            Editar Loja
                        </Button>
                    </div>

                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[auto]">Foto</TableHead>
                                <TableHead className="w-[auto]">Nome</TableHead>
                                <TableHead className="w-[auto]">Status</TableHead>
                                <TableHead className="w-[auto]">Cor de Fundo</TableHead>
                                <TableHead className="w-[auto]">Telefone</TableHead>
                                <TableHead className="w-[auto]">Endereço</TableHead>
                                <TableHead className="w-[auto]">Descrição</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {store && (
                                <TableRow key={store.id}>
                                    <TableCell className="font-medium">
                                        <Avatar>
                                            <AvatarImage
                                                className="rounded-full w-auto h-12 border-2"
                                                src={store.image_url}
                                                alt={store.name}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{store.name}</TableCell>
                                    <TableCell className="text-green-500">{store.is_open ? "Aberto" : "Fechado"}</TableCell>
                                    <TableCell>{store.background_color}</TableCell>
                                    <TableCell>{store.phone}</TableCell>
                                    <TableCell>{store.address}</TableCell>
                                    <TableCell>{store.description}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dashboard />

            {/* Renderiza o componente EditStore se isEditModalOpen for true */}
            {isEditModalOpen && <EditStore store={store} onClose={closeEditModal} />}
        </>
    );
}
