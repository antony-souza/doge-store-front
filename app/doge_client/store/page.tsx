"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { IStore } from "@/app/util/interfaces-global.service";
import UserService from "../services/user.service";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { FormUpdateStore } from "./form-store-update";

export default function RenderStorePage() {
    const [store, setStore] = useState<IStore | null>(null);
    const [isEditing, setIsEditing] = useState(false);

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
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <TitlePage name={isEditing ? 'Loja - Editando' : 'Loja'} />
                        <Button className="flex gap-3" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">
                                {isEditing ? 'arrow_back' : 'edit'}
                            </span>
                            {isEditing ? 'Voltar' : 'Editar Loja'}
                        </Button>
                    </div>

                    {isEditing ? (
                        <FormUpdateStore />
                    ) : (
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
                                {store ? (
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
                                        <TableCell className="text-green-500">
                                            {store.is_open ? "Aberto" : "Fechado"}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ position: 'relative', width: '100px', height: '30px' }}>
                                                <div
                                                    style={{
                                                        backgroundColor: store.background_color,
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            fontSize: '12px',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {store.background_color}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{store.phone}</TableCell>
                                        <TableCell>{store.address}</TableCell>
                                        <TableCell>{store.description}</TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">Nenhuma loja encontrada</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    )}
                </LayoutPage>
            </LayoutDashboard>
        </>
    );
}
