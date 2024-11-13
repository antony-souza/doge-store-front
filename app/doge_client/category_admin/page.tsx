"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import UserService, { ICategory } from "../services/user.service";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormAddCatergoryAdmin } from "./form-add-category";
import withAuth from "@/app/util/withToken";
import { FormUpdateCategoryAdmin } from "./form-edit-category";
import SelectCase from "@/app/components/case-select";

function RenderCategoriesPageAdmin() {
    const [category, setCategory] = useState<ICategory[]>([]);
    const [stores, setStores] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");
    const [selectCategoryId, setSelectCategoryId] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleEditCategory = (id: string) => {
        setSelectCategoryId(id);
        setIsEditing(true);
        setIsCreate(false);
        setIsDelete(false);
    };
    const handleCreateCategory = () => {
        setIsCreate(true);
        setIsEditing(false);
    };

    const handleDeleteCategory = async (id: string) => {
        if (confirm("Deseja realmente deletar esta categoria?")) {
            try {
                const userService = new UserService();
                await userService.deleteCategory(id);
                setCategory(category.filter(item => item.id !== id));
                toast({
                    title: "Categoria deletada",
                    description: "A categoria foi removida com sucesso.",
                    variant: "default",
                });
            } catch (error) {
                toast({
                    title: "Erro ao deletar categoria",
                    description: "Não foi possível deletar a categoria.",
                    variant: "destructive",
                });
            }
        }
    };


    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setIsDelete(false);
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
    }, [selectedStoreID, selectCategoryId, isEditing, isCreate, isDelete]);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between">
                    <TitlePage name={isEditing ? 'Categorias - Editando' : isCreate ? 'Categorias - Criando' : isDelete ? 'Categorias - Excluindo' : 'Categorias'} />
                    <div className="flex gap-2">
                        {(isEditing || isCreate) && (
                            <Button className="flex gap-2" onClick={handleBackToTable}>
                                <span className="material-symbols-outlined">arrow_back</span>
                                Voltar
                            </Button>
                        )}
                        {!isCreate && (
                            <Button onClick={handleCreateCategory} disabled={!selectedStoreID}>
                                <span className="material-symbols-outlined">add</span>
                                Criar Categoria
                            </Button>
                        )}
                    </div>
                </div>
                {isCreate && <FormAddCatergoryAdmin
                    storeId={selectedStoreID}
                />}
                {isEditing && <FormUpdateCategoryAdmin
                    categoryId={selectCategoryId}
                />}
                {!isCreate && !isEditing && (
                    <div className="pt-3 mt-5">
                        <SelectCase
                            label="Selecione uma loja"
                            name="store_id"
                            value={selectedStoreID}
                            onChange={(e) => setSelectedStoreID(e.target.value)}
                            options={[
                                { value: "", label: "Selecione uma loja" },
                                ...stores.map(store => ({ value: store.id, label: store.name }))
                            ]}
                        />
                        <Table className="mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Imagem</TableHead>
                                    <TableHead className="w-[400px]">Nome</TableHead>
                                    <TableHead className="w-[100px]">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {category.length > 0 ? (
                                    category.map((categoryItem) => (
                                        <TableRow key={categoryItem.id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage
                                                        className="rounded-full w-12 h-12 border-2"
                                                        src={categoryItem.image_url || ""}
                                                        alt={categoryItem.name || "Imagem da categoria"}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{categoryItem.name || "-"}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditCategory(categoryItem.id)}
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        disabled={isDelete === true}
                                                        onClick={() => handleDeleteCategory(categoryItem.id)}
                                                    >
                                                        <span className="material-symbols-outlined">{isDelete ? 'auto_delete' : 'delete'}</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">Nenhuma categoria encontrada</TableCell>
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

export default withAuth(RenderCategoriesPageAdmin);