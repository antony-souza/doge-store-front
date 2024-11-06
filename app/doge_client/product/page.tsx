"use client";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { IStore } from "@/app/util/interfaces-global.service";
import withAuth from "@/app/util/withToken";
import UserService, { IProduct } from "../services/user.service";
import { toast } from "@/hooks/use-toast";
import { FormUpdateProduct } from "./form-product-update";
import { formatPrice } from "@/app/util/formt-price";
import { FormCreateProduct } from "./form-product-create";

const userService = new UserService();

function RenderProductPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectProductId, setSelectProductId] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const id = localStorage.getItem("store_id") as string;
                const response = await userService.getAllProducts(id);
                setProducts(response);
            } catch (error) {
                toast({
                    title: "Erro ao buscar a loja",
                    description: "Não foi possível buscar a loja. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            }
        };

        fetchProducts();
    }, [isEditing, isCreate, isDelete]);

    const handleCreateProduct = () => {
        setIsCreate(true);
        setIsEditing(false);
    };

    const handleEditProduct = (id: string) => {
        setSelectProductId(id);
        setIsEditing(true);
        setIsCreate(false);
    };

    const handleDeleteProduct = async (id: string) => {
        setSelectProductId(id);
        setIsEditing(false);
        setIsCreate(false);

        try {
            await userService.deleteProduct(selectProductId);
            setIsDelete(true);
            toast({
                title: "Sucesso",
                description: "Produto deletado com sucesso!",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Erro ao deletar o produto",
                description: "Não foi possível deletar o produto. Tente novamente mais tarde.",
                variant: "destructive",
            });
        }
    };

    const handleBackToTable = () => {
        setIsEditing(false);
        setIsCreate(false);
        setSelectProductId("");
    };

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <TitlePage
                            name={
                                isEditing ? "Editar Produto" : isCreate ? "Criar Produto" : "Produtos"
                            }
                        />
                        <div className="flex gap-2">
                            {(isEditing || isCreate) && (
                                <Button className="flex gap-2" onClick={handleBackToTable}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Voltar
                                </Button>
                            )}
                            {!isCreate && (
                                <Button onClick={handleCreateProduct}>
                                    Criar Produto
                                </Button>
                            )}
                        </div>
                    </div>

                    {isEditing && (<FormUpdateProduct id={selectProductId} />)}
                    {isCreate && (<FormCreateProduct />)}

                    {!isEditing && !isCreate && (
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
                    )}
                </LayoutPage>
            </LayoutDashboard>
        </>
    );
}

export default withAuth(RenderProductPage);
