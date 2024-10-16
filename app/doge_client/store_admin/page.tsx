"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { FormUpdateStore } from "../store/form-store-update";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormUpdateStoreAdmin } from "./form-update-store";
import { FormCreateStore } from "./form-create-store";
import { FormDeleteStores } from "./form-delete-store";

export default function RenderPageStoreAdmin() {
    const [stores, setStore] = useState<IStore[]>([]);
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
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
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
                            <Button
                                variant={"destructive"}
                                className="flex gap-3"
                                onClick={handleDeleteClick}
                            >
                                <span className="material-symbols-outlined">
                                    {isDelete ? 'arrow_back' : 'delete'}
                                </span>
                                {isDelete ? 'Voltar' : 'Excluir Loja'}
                            </Button>
                            <Button
                                className="flex gap-3"
                                onClick={handleEditClick}
                            >
                                <span className="material-symbols-outlined">
                                    {isEditing ? 'arrow_back' : 'edit'}
                                </span>
                                {isEditing ? 'Voltar' : 'Editar Loja'}
                            </Button>
                            <Button
                                className="flex gap-3"
                                onClick={handleCreateClick}
                            >
                                <span className="material-symbols-outlined">
                                    {isCreate ? 'arrow_back' : 'add'}
                                </span>
                                {isCreate ? 'Voltar' : 'Nova Loja'}
                            </Button>
                        </div>
                    </div>

                    {isEditing ? (
                        <FormUpdateStoreAdmin />
                    ) : isCreate ? (
                        <FormCreateStore />
                    ) : isDelete ? (
                        <FormDeleteStores />
                    ) : (
                        <Table className="min-w-full mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[auto]">Imagem</TableHead>
                                    <TableHead className="w-[auto]">Nome</TableHead>
                                    <TableHead className="w-[auto]">Status</TableHead>
                                    <TableHead className="w-[auto]">Cor de Fundo</TableHead>
                                    <TableHead className="w-[auto]">Telefone</TableHead>
                                    <TableHead className="w-[auto]">Endereço</TableHead>
                                    <TableHead className="w-[auto]">Descrição</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stores.length > 0 ? (
                                    stores.map((store) => (
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
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
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
