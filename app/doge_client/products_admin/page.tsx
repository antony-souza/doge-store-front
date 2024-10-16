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
import { IProduct } from "../services/user.service";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormUpdateProduct } from "../product/form-product-update";
import { FormCreateProduct } from "../product/form-product-create";
import { FormDeleteProduct } from "../product/form-delete-product";

export default function RenderProductsPageAdmin() {
    const [products, setProducts] = useState<IProduct[]>([]);
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
        const fetchProductsByStore = async () => {
            if (!selectedStoreID) {
                return;
            }

            try {
                const adminService = new AdminService();
                const products = await adminService.getAllProductsByStore(selectedStoreID);

                if (products.length === 0) {
                    toast({
                        title: "Nenhum produto encontrado",
                        description: `Nenhum produto foi encontrado para a loja selecionada.`,
                        variant: "destructive",
                    });
                }

                setProducts(products);
            } catch (error) {
                toast({
                    title: "Erro ao carregar produtos",
                    description: "Ocorreu um erro ao carregar os produtos desta loja.",
                    variant: "destructive",
                });
            }
        };

        fetchProductsByStore();
    }, [selectedStoreID]);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={isEditing ? 'Produtos Gerais - Editando' : isCreate ? 'Produtos Gerais - Criando' : isDelete ? 'Produtos Gerais - Excluindo' : 'Produtos Gerais'} />
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

                {isEditing ? (
                    <FormUpdateProduct />
                ) : isCreate ? (
                    <FormCreateProduct />
                ) : isDelete ? (
                    <FormDeleteProduct />
                ) : (
                    <div className="pt-3 mt-5">
                        <label className="block text-sm font-medium">Escolha a loja a ser mapeada</label>
                        <select
                            name="store_id"
                            className="mt-1 block w-full p-2 border rounded-md"
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
                                <option value="" disabled>Nenhuma Loja Disponível ou Carregando!</option>
                            )}
                        </select>

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
                                            <TableCell>{product.featured_products ? "Sim" : "Não"}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">Nenhum produto encontrado</TableCell>
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
