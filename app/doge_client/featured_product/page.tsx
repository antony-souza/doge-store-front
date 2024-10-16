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

export default function RenderFeaturedProducts() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getAllFeaturedProducts();
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
                    <TitlePage name={'Produtos em Destaque'} />
                    {/* <Button variant={"destructive"} className="cursor-not-allowed">
                        <div className="flex gap-2 items-center ">
                            <span className="material-symbols-outlined">edit</span>
                            Editar
                        </div>
                        </Button> */}
                </div>
                <Table className="min-w-full mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[auto]">Foto</TableHead>
                            <TableHead className="w-[auto]">Nome</TableHead>
                            <TableHead className="w-[auto]">Preço</TableHead>
                            <TableHead className="w-[auto]">Descrição</TableHead>
                            <TableHead className="w-[auto]">Categoria</TableHead>
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
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">Nenhum produto encontrado</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </LayoutPage>
        </LayoutDashboard>
    );
}