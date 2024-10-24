"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import AdminService, { IUsers } from "../services/admin.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormCreateUser } from "./form-create-users";
import { FormDeleteUsers } from "./form-delete-users";
import { FormUpdateUsers } from "./form-update-users";
import withAuth from "@/app/util/withToken";

function RenderUserPage() {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleCreateClick = () => {
        setIsCreate(!isCreate);
    };

    const handleDeleteClick = () => {
        setIsDelete(!isDelete);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllUsers();
                setUsers(response);
            } catch (error) {
                ("Erro ao buscar os usuários:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={isEditing ? 'Usuários - Editando' : isCreate ? 'Usuários - Criando' : isDelete ? 'Usuários - Excluindo' : 'Usuários'} />
                    <div className="flex gap-2">
                        <Button variant={'destructive'} className="flex gap-2" onClick={handleDeleteClick}>
                            <span className="material-symbols-outlined">
                                {isDelete ? 'arrow_back' : 'delete'}
                            </span>
                            {isDelete ? 'Voltar' : 'Excluir'}
                        </Button>
                        <Button className="flex gap-2" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">
                                {isEditing ? 'arrow_back' : 'edit'}
                            </span>
                            {isEditing ? 'Voltar' : 'Editar'}
                        </Button>
                        <Button className="flex gap-2" onClick={handleCreateClick}>
                            <span className="material-symbols-outlined">
                                {isCreate ? 'arrow_back' : 'add'}
                            </span>
                            {isCreate ? 'Voltar' : 'Criar'}
                        </Button>
                    </div>
                </div>
                {isEditing ? (
                    <FormUpdateUsers />
                ) : isCreate ? <FormCreateUser />
                    : isDelete ? <FormDeleteUsers /> : (
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
                                                        className="rounded-full w-12 h-12 object-cover border-2"
                                                        src={users.image_url || ""}
                                                        alt={users.name || "Imagem do usuário"}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{users.name || "-"}</TableCell>
                                            <TableCell>{users.email || "-"}</TableCell>
                                            <TableCell>{users.store?.name || "-"}</TableCell>
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
                    )}
            </LayoutPage>
        </LayoutDashboard>
    )
}

export default withAuth(RenderUserPage);