"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import UserService, { ICategory } from "../services/user.service";
import { FormCreateCategory } from "./form-create-category";
import { FormUpdateCategory } from "./form-update-category";
import withAuth from "@/app/util/withToken";
import { toast } from "@/hooks/use-toast";

function CategoryPage() {
    const [category, setCategory] = useState<ICategory[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectCategoryId, setSelectCategoryId] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const userService = new UserService();
                const id = localStorage.getItem('store_id');
                const response = await userService.getAllCategories(id as string);
                setCategory(response);
            } catch (error) {
                toast({
                    title: "Erro ao buscar categorias",
                    description: "Não foi possível buscar as categorias. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            }
        };
        fetchCategories();
    }, [isEditing, isCreate, isDelete]);


    const handleEditCategory = (id: string) => {
        setSelectCategoryId(id);
        setIsEditing(true);
        setIsCreate(false);
        setIsDelete(false);
    }

    const handleDeleteCategory = async (id: string) => {
        setSelectCategoryId(id);
        setIsEditing(false);
        setIsCreate(false);
        setIsDelete(true);

        try {
            const userService = new UserService();
            await userService.deleteCategory(id);
            setIsDelete(false);
        } catch (error) {
            setIsDelete(false);
            toast({
                title: "Erro ao excluir categoria",
                description: "Não foi possível excluir a categoria. Tente novamente mais tarde.",
                variant: "destructive",
            });
        }
    };

    const handleCreateCategory = () => {
        setIsCreate(true);
        setIsEditing(false);
        setIsDelete(false);
    };

    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setIsDelete(false);
        setSelectCategoryId("");
    };

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
                            <Button onClick={handleCreateCategory}>
                                <span className="material-symbols-outlined">add</span>
                                Criar Categoria
                            </Button>
                        )}
                    </div>
                </div>

                {isCreate && <FormCreateCategory />}
                {isEditing && <FormUpdateCategory id={selectCategoryId} />}
                {!isCreate && !isEditing && (
                    <Table className="min-w-full mt-4">
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
                                                    className="rounded-full w-auto h-12 border-2"
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
                )}
            </LayoutPage>
        </LayoutDashboard>
    );
}

export default withAuth(CategoryPage);
