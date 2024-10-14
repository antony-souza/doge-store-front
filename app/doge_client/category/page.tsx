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
import { FormDeleteCategory } from "./form-delete-category";

export default function CategoryPage() {
    const [category, setCategory] = useState<ICategory[]>([]);
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
        const fetchCategories = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getAllCategories();
                setCategory(response);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <TitlePage name={isEditing ? 'Categorias - Editando' : isCreate ? 'Categorias - Criando' : isDelete ? 'Categorias - Excluindo' : 'Categorias'} />
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

                    {(isCreate) ? <FormCreateCategory />
                        : isEditing ? <FormUpdateCategory />
                            : isDelete ? <FormDeleteCategory /> :
                                <Table className="min-w-full mt-4">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Foto</TableHead>
                                            <TableHead className="w-[auto]">Nome</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {category.length > 0 ? (
                                            category.map(category => (
                                                <TableRow key={category.id}>
                                                    <TableCell className="font-medium">
                                                        <Avatar>
                                                            <AvatarImage
                                                                className="rounded-full w-auto h-12 border-2"
                                                                src={category.image_url || ""}
                                                                alt={category.name || "Imagem do produto"}
                                                            />
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{category.name || "-"}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center">Nenhuma categoria foi encontrada</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                    }
                </LayoutPage>
            </LayoutDashboard>
        </>
    );
}
