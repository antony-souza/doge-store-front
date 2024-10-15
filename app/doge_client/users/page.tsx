"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import AdminService, { IUsers } from "../services/admin.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function RenderUserPage() {
    const [users, setUsers] = useState<IUsers[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllUsers();
                setUsers(response);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={'Usuários'} />
                    <div className="flex gap-2">
                        <Button variant={'destructive'} className="flex gap-2">
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                            Excluir
                        </Button>
                        <Button className="flex gap-2">
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                            Editar
                        </Button>
                        <Button className="flex gap-2">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            Adicionar
                        </Button>
                    </div>
                </div>
                <Table className="min-w-full mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[auto]">Foto</TableHead>
                            <TableHead className="w-[auto]">Nome</TableHead>
                            <TableHead className="w-[auto]">Email</TableHead>
                            <TableHead className="w-[auto]">Loja</TableHead>
                            <TableHead className="w-[auto]">Acesso</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map(users => (
                                <TableRow key={users.id}>
                                    <TableCell className="font-medium">
                                        <Avatar>
                                            <AvatarImage
                                                className="rounded-full w-auto h-12 border-2"
                                                src={users.image_url || ""}
                                                alt={users.name || "Imagem do produto"}
                                            />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{users.name || "-"}</TableCell>
                                    <TableCell>{users.email || "-"}</TableCell>
                                    <TableCell>{users.store.name || "-"}</TableCell>
                                    <TableCell>{users.role || "-"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">Nenhum usuário foi encontrado</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </LayoutPage>
        </LayoutDashboard>
    )
}