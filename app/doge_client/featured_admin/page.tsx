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
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import withAuth from "@/app/util/withToken";

function RenderFeaturedProductsAdmin() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [stores, setStores] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const adminService = new AdminService();
                const stores = await adminService.getAllStore();
                setStores(stores);
            } catch (error) {
                console.error("Erro ao buscar as lojas:", error);
            }
        };
        fetchStores();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getAllFeaturedProducts(selectedStoreID);
                setProducts(response);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchProducts();
    }, [selectedStoreID]);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={'Produtos em Destaque'} />
                </div>
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
                </div>
                <Table className="min-w-full mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Foto</TableHead>
                            <TableHead className="w-[auto]">Nome</TableHead>
                            <TableHead className="w-[auto]">Preço</TableHead>
                            <TableHead className="w-[auto]">Descrição</TableHead>
                            <TableHead className="w-[100px]">Categoria</TableHead>
                            <TableHead className="w-[100px]">Loja</TableHead>
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
                                    <TableCell>{product.store?.name || "-"}</TableCell>
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

export default withAuth(RenderFeaturedProductsAdmin);