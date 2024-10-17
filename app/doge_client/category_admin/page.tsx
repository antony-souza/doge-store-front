"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { formatPrice } from "@/app/util/formt-price";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import UserService, { ICategory } from "../services/user.service";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormDeleteProductAdmin } from "../products_admin/form-delete-products";
import { FormUpdateCategoryAdmin } from "./form-edit-category";
import { FormAddCatergoryAdmin } from "./form-add-category";

export default function RenderCategoriesPageAdmin() {
    const [category, setCategory] = useState<ICategory[]>([]);
    const [stores, setStores] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");
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
        const fetchStores = async () => {
            try {
                const adminService = new AdminService();
                const stores = await adminService.getAllStore();

                setStores(stores);
            } catch (error) {
                toast({
                    title: "Erro ao carregar lojas",
                    description: "Ocorreu um erro ao carregar as lojas.",
                    variant: "destructive",
                });
            }
        };

        fetchStores();
    }, []);

    useEffect(() => {
        const fetchCategoriesByStore = async () => {
            if (!selectedStoreID) {
                return;
            }

            try {
                const userService = new UserService();
                const category = await userService.getAllCategories(selectedStoreID);

                if (category.length === 0) {
                    toast({
                        title: "Nenhuma categoria encontrada",
                        description: `Nenhuma categoria foi encontrada para a loja selecionada.`,
                        variant: "destructive",
                    });
                }

                setCategory(category);
            } catch (error) {
                toast({
                    title: "Erro ao carregar categorias",
                    description: "Ocorreu um erro ao carregar as categorias desta loja.",
                    variant: "destructive",
                });
            }
        };

        fetchCategoriesByStore();
    }, [selectedStoreID]);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={
                        isEditing ? 'Categorias Gerais - Editando'
                            : isCreate ? 'Categorias Gerais - Criando'
                                : isDelete ? 'Categorias Gerais - Excluindo' : 'Categorias Gerais'} />
                    <div className="flex gap-2">
                        <Button variant={"destructive"} className="flex gap-3" onClick={handleDeleteClick}>
                            <span className="material-symbols-outlined">
                                {isDelete ? 'arrow_back' : 'delete'}
                            </span>
                            {isDelete ? 'Voltar' : 'Excluir Categoria'}
                        </Button>
                        <Button className="flex gap-3" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">
                                {isEditing ? 'arrow_back' : 'edit'}
                            </span>
                            {isEditing ? 'Voltar' : 'Editar Categoria'}
                        </Button>
                        <Button className="flex gap-3" onClick={handleCreateClick}>
                            <span className="material-symbols-outlined">
                                {isCreate ? 'arrow_back' : 'add'}
                            </span>
                            {isCreate ? 'Voltar' : 'Nova Categoria'}
                        </Button>
                    </div>
                </div>
                {isEditing ? (
                    <FormUpdateCategoryAdmin />
                ) : isCreate ? (
                    <FormAddCatergoryAdmin />
                ) : isDelete ? (
                    <FormDeleteProductAdmin />
                ) : (
                    <div className="pt-3 mt-5">
                        <label className="block text-sm font-medium">Escolha a loja a ser mapeada</label>
                        <select
                            name="store_id"
                            className="mt-1 block w-200 p-2 border rounded-md "
                            value={selectedStoreID}
                            onChange={(e) => setSelectedStoreID(e.target.value)}
                        >
                            <option value="" disabled>Selecione uma loja</option>
                            {stores.length > 0 ? (
                                stores.map((store) => (
                                    <option key={store.id} value={store.id}>
                                        {store.name}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>Nenhuma Loja Disponível!</option>
                            )}
                        </select>

                        <Table className="min-w-full mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[auto]">Foto</TableHead>
                                    <TableHead className="w-[auto]">Nome</TableHead>
                                    <TableHead className="w-[auto]">Loja</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {category.length > 0 ? (
                                    category.map(category => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage
                                                        className="rounded-full w-12 h-12 object-cover border-2"
                                                        src={category.image_url || ""}
                                                        alt={category.name || "Imagem da categoria"}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{category.name || "-"}</TableCell>
                                            <TableCell>{category.store.name || "-"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">Nenhuma categoria encontrada</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </LayoutPage>
            <Toaster />
        </LayoutDashboard>
    );
}
