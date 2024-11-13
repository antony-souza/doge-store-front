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
import UserService, { IProduct } from "../services/user.service";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";
import { FormCreateProductAdmin } from "./form-add-products";
import { FormUpdateProductAdmin } from "./form-edit-products";
import withAuth from "@/app/util/withToken";
import SelectCase from "@/app/components/case-select";

function RenderProductsPageAdmin() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [stores, setStores] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");
    const [selectProductId, setSelectProductId] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleCreateProduct = (id: string) => {
        setSelectedStoreID(id);
        setIsCreate(true);
        setIsEditing(false);
    };

    const handleEditProduct = (id: string) => {
        setSelectProductId(id);
        setIsEditing(!isEditing);
    };

    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setSelectProductId("");
    };

    const handleDeleteProduct = async (id: string) => {
        setSelectProductId(id)
        setIsDelete(!isDelete);
        setIsCreate(false);
        setIsEditing(false);

        if (confirm("Deseja realmente deletar este produto?")) {
            try {
                const userService = new UserService();
                await userService.deleteProduct(id);
                toast({
                    title: "Produto excluído",
                    description: "Produto excluído com sucesso.",
                    variant: "default",
                });
            } catch (error) {
                setIsDelete(false);
                toast({
                    title: "Erro ao excluir produto",
                    description: "Ocorreu um erro ao excluir o produto.",
                    variant: "destructive",
                });
            }
        }
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
                const userService = new UserService();
                const products = await userService.getAllProducts(selectedStoreID);

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
    }, [isCreate, isEditing, isDelete, selectedStoreID, stores]);

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <div className="flex justify-between align-middle">
                    <TitlePage name={
                        isEditing ? 'Produtos Gerais - Editando'
                            : isCreate ? 'Produtos Gerais - Criando'
                                : isDelete ? 'Produtos Gerais - Excluindo' : 'Produtos Gerais'} />
                    <div className="flex gap-2">
                        {(isEditing || isCreate) && (
                            <Button className="flex gap-2" onClick={handleBackToTable}>
                                <span className="material-symbols-outlined">arrow_back</span>
                                Voltar
                            </Button>
                        )}
                        {!isCreate && (
                            <Button
                                onClick={() => handleCreateProduct(selectedStoreID)}
                                disabled={!selectedStoreID}
                            >
                                Criar Produto
                            </Button>
                        )}
                    </div>
                </div>
                {isEditing && (<FormUpdateProductAdmin id={selectProductId} storeId={selectedStoreID} />)}
                {isCreate && (<FormCreateProductAdmin id={selectedStoreID} />)}
                {!isEditing && !isCreate && (
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
                                    <TableHead className="w-[100px]">Nome</TableHead>
                                    <TableHead className="w-[100px]">Preço</TableHead>
                                    <TableHead className="w-[100px]">Descrição</TableHead>
                                    <TableHead className="w-[100px]">Categoria</TableHead>
                                    <TableHead className="w-[100px]">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">
                                                <Avatar>
                                                    <AvatarImage
                                                        className="rounded-full w-12 h-12 border-2"
                                                        src={product.image_url}
                                                        alt={product.name}
                                                    />
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{formatPrice(product.price)}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            <TableCell>{product.category.name || '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEditProduct(product.id)}
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Nenhuma loja encontrada
                                        </TableCell>
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

export default withAuth(RenderProductsPageAdmin);