"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/layout-dashboard";
import { LayoutPage } from "../../components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import UserService, { IProduct } from "../services/user.service";
import { FormUpdateProduct } from "./form-product-update";
import { formatPrice } from "@/app/util/formt-price";
import { FormCreateProduct } from "./form-product-create";
import { FormDeleteProduct } from "./form-delete-product";
import withAuth from "@/app/util/withToken";

function ProductPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
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
        const fetchProducts = async () => {
            try {
                const userService = new UserService();
                const id = localStorage.getItem("store_id");
                const response = await userService.getAllProducts(id as string);
                setProducts(response);
            } catch (error) {
            }
        };
        fetchProducts();
    }, []);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={isEditing ? 'Produtos - Editando' : isCreate ? 'Produtos - Criando' : isDelete ? 'Produtos - Excluindo' : 'Produtos'} />
                    <div className="flex gap-2">
                        <Button variant={"destructive"} className="flex gap-3" onClick={handleDeleteClick}>
                            <span className="material-symbols-outlined">
                                {isDelete ? 'arrow_back' : 'delete'}
                            </span>
                            {isDelete ? 'Voltar' : 'Excluir Produto'}
                        </Button>
                        <Button className="flex gap-3" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">
                                {isEditing ? 'arrow_back' : 'edit'}
                            </span>
                            {isEditing ? 'Voltar' : 'Editar Produto'}
                        </Button>
                        <Button className="flex gap-3" onClick={handleCreateClick}>
                            <span className="material-symbols-outlined">
                                {isCreate ? 'arrow_back' : 'add'}
                            </span>
                            {isCreate ? 'Voltar' : 'Novo Produto'}
                        </Button>
                    </div>
                </div>

                {(isEditing) ? (
                    <FormUpdateProduct />
                ) : (isCreate) ? <FormCreateProduct />
                    : isDelete ? <FormDeleteProduct /> : (
                        <Table className="min-w-full mt-4">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[auto]">Foto</TableHead>
                                    <TableHead className="w-[auto]">Nome</TableHead>
                                    <TableHead className="w-[auto]">Preço</TableHead>
                                    <TableHead className="w-[auto]">Descrição</TableHead>
                                    <TableHead className="w-[auto]">Categoria</TableHead>
                                    <TableHead className="w-[auto]">Destaque</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage
                                                        className="rounded-full w-20 h-18 object-cover border-2"
                                                        src={product.image_url || ""}
                                                        alt={product.name || "Imagem do produto"}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{product.name || "-"}</TableCell>
                                            <TableCell>{formatPrice(product.price) || "-"}</TableCell>
                                            <TableCell>{product.description || "-"}</TableCell>
                                            <TableCell>{product.category?.name || "-"}</TableCell>
                                            <TableCell>{product.featured_products ? "Sim": "Não"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">Nenhum produto encontrado</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
            </LayoutPage>
        </LayoutDashboard>
    );
}

export default withAuth(ProductPage);