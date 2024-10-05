"use client";

import React, { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/layout-dashboard";
import { LayoutPage } from "../../components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import UserService, { IProduct } from "../services/user.service";
import { formatPrice } from "@/app/util/formt-price";
import { FormUpdateProduct } from "./form-product-update";


export default function ProductPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar a edição
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); // Para armazenar o produto selecionado para edição

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Alternar o estado de edição
    };

    const handleProductEdit = (product: IProduct) => {
        setSelectedProduct(product); // Armazenar o produto que está sendo editado
        setIsEditing(true); // Ativar o modo de edição
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getAllProducts();
                setProducts(response);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={isEditing ? 'Produtos - Editando' : 'Produtos'} />
                    <div className="flex gap-5">
                        {isEditing ? <Button className="flex gap-3" onClick={handleEditClick}>
                            <span className="material-symbols-outlined">arrow_back</span>
                            Voltar</Button> : null}
                        <Button className="flex gap-3">
                            <span className="material-symbols-outlined">add</span>
                            Novo Produto
                        </Button>
                    </div>
                </div>
                {isEditing ? (
                    <FormUpdateProduct /> // Renderize o formulário de edição
                ) : (
                    <Table className="min-w-full mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[auto]">Foto</TableHead>
                                <TableHead className="w-[auto]">Nome</TableHead>
                                <TableHead className="w-[auto]">Preço</TableHead>
                                <TableHead className="w-[auto]">Descrição</TableHead>
                                <TableHead className="w-[auto]">Categoria</TableHead>
                                <TableHead className="w-[auto]">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">
                                            <Avatar>
                                                <AvatarImage
                                                    className="rounded-full w-auto h-12 border-2"
                                                    src={product.image_url || ""}
                                                    alt={product.name || "Imagem do produto"}
                                                />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{product.name || "-"}</TableCell>
                                        <TableCell>{formatPrice(product.price) || "-"}</TableCell>
                                        <TableCell>{product.description || "-"}</TableCell>
                                        <TableCell>{product.category?.name || "-"}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleProductEdit(product)}>Editar</Button> {/* Botão para editar o produto */}
                                        </TableCell>
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
