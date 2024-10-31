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
import withAuth from "@/app/util/withToken";

function RenderStorePage() {
    const [store, setStore] = useState<IStore[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const userService = new UserService();
                const id = localStorage.getItem("store_id") as string;
                const response = await userService.getStore(id);
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
                        <TitlePage name={isEditing ? "Loja - Editando" : "Loja"} />
                        <Button className="flex gap-3" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">
                                {isEditing ? "arrow_back" : "edit"}
                            </span>
                            {isEditing ? "Voltar" : "Editar Loja"}
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
                                {store.length > 0 ? (
                                    store.map((storeItem) => (
                                        <TableRow key={storeItem.id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage
                                                        className="rounded-full w-auto h-12 border-2"
                                                        src={storeItem.image_url}
                                                        alt={storeItem.name}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{storeItem.name}</TableCell>
                                            <TableCell className={storeItem.is_open ? "text-green-500" : "text-red-500"}>
                                                {storeItem.is_open ? "Aberto" : "Fechado"}
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ position: 'relative', width: '100px', height: '30px' }}>
                                                    <div
                                                        style={{
                                                            backgroundColor: storeItem.background_color,
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
                                                            {storeItem.background_color}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{storeItem.phone}</TableCell>
                                            <TableCell>{storeItem.address}</TableCell>
                                            <TableCell>{storeItem.description}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Nenhuma loja encontrada
                                        </TableCell>
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

export default withAuth(RenderStorePage);
