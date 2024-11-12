"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { IStore } from "@/app/util/interfaces-global.service";
import withAuth from "@/app/util/withToken";
import UserService from "../services/user.service";
import { toast } from "@/hooks/use-toast";
import { FormUpdateStore } from "./form-store-update";

function RenderStoreUserPage() {
    const [stores, setStore] = useState<IStore>();
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectStoreId, setSelectStoreId] = useState<string>('');

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const userService = new UserService();
                const id = localStorage.getItem('store_id') as string;
                const response = await userService.getStore(id);
                setStore(response);
            } catch (error) {
                toast({
                    title: "Erro ao buscar a loja",
                    description: "Não foi possível buscar a loja. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            }
        };

        fetchStore();
    }, [isEditing]);

    const handleEditStore = (id: string) => {
        setSelectStoreId(id);
        setIsEditing(true);
        setIsCreate(false);
    }


    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setIsDelete(false);
        setSelectStoreId('');
    };

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <TitlePage
                            name={
                                isEditing
                                    ? 'Lojas - Editando'
                                    : isCreate
                                        ? 'Lojas - Criando'
                                        : isDelete
                                            ? 'Lojas - Excluindo'
                                            : 'Lojas'
                            }
                        />
                        <div className="flex gap-2">
                            {isEditing && (
                                <Button className="flex gap-2" onClick={handleBackToTable}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Voltar
                                </Button>
                            )}
                        </div>
                    </div>
                    {isEditing ? (
                        <FormUpdateStore id={selectStoreId} />
                    ) : (
                        <Table className="min-w-full mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[auto]">Imagem</TableHead>
                                    <TableHead className="w-[auto]">Nome</TableHead>
                                    <TableHead className="w-[auto]">Horário de Abertura</TableHead>
                                    <TableHead className="w-[auto]">Horário de Fechamento</TableHead>
                                    <TableHead className="w-[auto]">Telefone</TableHead>
                                    <TableHead className="w-[auto]">Endereço</TableHead>
                                    <TableHead className="w-[auto]">Descrição</TableHead>
                                    <TableHead className="w-[auto]">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stores ? (
                                    <TableRow key={stores.id}>
                                        <TableCell className="font-medium">
                                            <Avatar>
                                                <AvatarImage
                                                    className="rounded-full w-auto h-12 border-2"
                                                    src={stores.image_url}
                                                    alt={stores.name}
                                                />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{stores.name}</TableCell>
                                        <TableCell>{stores.open_time}</TableCell>
                                        <TableCell>{stores.close_time}</TableCell>
                                        <TableCell>{stores.phone}</TableCell>
                                        <TableCell>{stores.address}</TableCell>
                                        <TableCell>{stores.description}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleEditStore(stores.id)}
                                                >
                                                    <span className="material-symbols-outlined">edit</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
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

export default withAuth(RenderStoreUserPage);