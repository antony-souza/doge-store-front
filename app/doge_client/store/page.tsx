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

export default function RenderStorePage() {
    const [store, setStore] = useState<IStore | null>(null);

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

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <>
                            <TitlePage name="Loja" />
                        </>

                        <>
                            <Button className="flex gap-3">
                                <span className="material-symbols-outlined">
                                    draw
                                </span>
                                Editar Loja
                            </Button>
                        </>
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
                </LayoutPage>
            </LayoutDashboard>
        </>
    );
}
