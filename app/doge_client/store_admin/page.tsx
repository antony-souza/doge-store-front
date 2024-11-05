"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormUpdateStoreAdmin } from "./form-update-store";
import { FormCreateStore } from "./form-create-store";
import withAuth from "@/app/util/withToken";
import UserService from "../services/user.service";
import { toast } from "@/hooks/use-toast";

const adminService = new AdminService();
const userService = new UserService();

function RenderPageStoreAdmin() {
    const [stores, setStore] = useState<IStore[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectStoreId, setSelectStoreId] = useState<string>('');

    const handleCreateClick = () => {
        setIsCreate(!isCreate);
        setIsEditing(false);
        setSelectStoreId('');
    };

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStore(response);
            } catch (error) {

            }
        };

        fetchStore();
    }, [stores]);

    const handleEditStore = (id: string) => {
        setSelectStoreId(id);
        setIsEditing(true);
        setIsCreate(false);
    }

    const handleDeleteStore = async (id: string) => {
        setSelectStoreId(id);

        try {
            const response = await adminService.deleteStore(id) as IStore;

            toast({
                title: "Loja Excluída!",
                description: `A loja ${response.name} foi deletada com sucesso`,
                variant: "default"
            })
        } catch (error) {

        }
    };

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
                        <FormUpdateStoreAdmin id={selectStoreId} />
                    ) : isCreate ? (
                        <FormCreateStore />
                    ) : (
                        <Table className="min-w-full mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Imagem</TableHead>
                                    <TableHead className="w-[100px]">Nome</TableHead>
                                    <TableHead className="w-[100px]">Status</TableHead>
                                    <TableHead className="w-[100px]">Cor de Fundo</TableHead>
                                    <TableHead className="w-[100px]">Telefone</TableHead>
                                    <TableHead className="w-[auto]">Endereço</TableHead>
                                    <TableHead className="w-[auto]">Descrição</TableHead>
                                    <TableHead className="w-[100px]">Ações</TableHead>
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
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditStore(store.id)}
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleDeleteStore(store.id)}
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
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

export default withAuth(RenderPageStoreAdmin);