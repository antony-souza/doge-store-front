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
import FormUpdateUsers from "./form-update-users";
import withAuth from "@/app/util/withToken";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import UserService from "../services/user.service";

const adminService = new AdminService();
const userService = new UserService();

function RenderUserPage() {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const handleCreateClick = () => {
        setIsCreate(!isCreate);
        setIsEditing(false);
        setSelectedUserId('');
    };

    const handleEditUser = (id: string) => {
        setSelectedUserId(id);
        setIsEditing(true);
        setIsCreate(false);
    };

    const handleDeleteUser = async (id: string) => {
        setSelectedUserId(id);

        try {
            const response = await adminService.deleteUser(id);

            toast({
                title: "Usuário deletado com sucesso",
                description: `O usuário ${response.user.name} foi deletado com sucesso`,
                variant: "default"
            })
        } catch (error) {

        }
    };

    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setIsDelete(false);
        setSelectedUserId('');
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminService.getAllUsers();
                setUsers(response);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsers();
    }, [users]);

    return (
        <>
            <Toaster />
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <TitlePage name={isEditing ? 'Usuários - Editando' : isCreate ? 'Usuários - Criando' : isDelete ? 'Usuários - Excluindo' : 'Usuários'} />
                        <div className="flex gap-2">
                            {isDelete && (
                                <Button variant={'destructive'} className="flex gap-2" onClick={handleBackToTable}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Voltar
                                </Button>
                            )}
                            {isEditing && (
                                <Button className="flex gap-2" onClick={handleBackToTable}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Voltar
                                </Button>
                            )}
                            <Button className="flex gap-2" onClick={handleCreateClick}>
                                <span className="material-symbols-outlined">{isCreate ? 'arrow_back' : 'add'}</span>
                                {isCreate ? 'Voltar' : 'Novo Usuário'}
                            </Button>
                        </div>
                    </div>
                    <div className="mt-5">
                        {isEditing ? (
                            <FormUpdateUsers id={selectedUserId} />
                        ) : isCreate ? (
                            <FormCreateUser />
                        ) : (
                            <Table className="min-w-full mt-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[auto]">Foto</TableHead>
                                        <TableHead className="w-[auto]">Nome</TableHead>
                                        <TableHead className="w-[auto]">Email</TableHead>
                                        <TableHead className="w-[auto]">Loja</TableHead>
                                        <TableHead className="w-[150px]">Acesso</TableHead>
                                        <TableHead className="w-[150px]">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length > 0 ? (
                                        users.map(user => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">
                                                    <Avatar>
                                                        <AvatarImage
                                                            className="rounded-full w-12 h-12 object-cover border-2"
                                                            src={user.image_url || ""}
                                                            alt={user.name || "Imagem do usuário"}
                                                        />
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>{user.name || "-"}</TableCell>
                                                <TableCell>{user.email || "-"}</TableCell>
                                                <TableCell>{user.store?.name || "-"}</TableCell>
                                                <TableCell>{user.role || "-"}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => handleEditUser(user.id)}
                                                        >
                                                            <span className="material-symbols-outlined">edit</span>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                        >
                                                            <span className="material-symbols-outlined">delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
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
                    </div>
                </LayoutPage>
            </LayoutDashboard >
        </>
    );
}

export default withAuth(RenderUserPage);
