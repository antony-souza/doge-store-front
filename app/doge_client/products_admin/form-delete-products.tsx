import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service";

export const FormDeleteProductAdmin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [delProduct, setDelProduct] = useState<IUpdateProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [store, setStore] = useState<IUpdateProduct[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStore(response);
            } catch (error) {
                console.error("Erro ao buscar as lojas:", error);
            }
        };
        fetchStore();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productService = new UserService();
                const response = await productService.getAllProducts(selectedStoreID);
                setDelProduct(response);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchProducts();
    }, [selectedStoreID]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedProduct) {
            toast({
                title: "Seleção de produto",
                description: "Por favor, selecione um produto para deletar.",
                variant: "destructive",
            });
            return;
        }

        const productService = new UserService();

        try {
            const response = await productService.deleteProduct(selectedProduct);

            if (response) {
                toast({
                    title: "Produto deletado com sucesso!",
                    description: "O produto foi desativado.",
                    variant: "default",
                });
                formRef.current?.reset();
            } 

            if(!response) {
                toast({
                    title: "Erro ao deletar produto",
                    description: "Verifique os dados e tente novamente.",
                    variant: "destructive",
                });
            }
            
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            toast({
                title: "Erro no servidor",
                description: "Ocorreu um erro ao deletar o produto.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div className="pt-3 mt-5">
                    <label className="block text-sm font-medium">Escolha a loja</label>
                    <select
                        name="store_id"
                        className="mt-1 block w-200 p-2 border rounded-md"
                        value={selectedStoreID}
                        onChange={(e) => setSelectedStoreID(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma loja</option>
                        {store.length > 0 ? (
                            store.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhuma Loja Disponível!</option>
                        )}
                    </select>
                </div>
                <div className="pt-3">
                    <label className="block text-sm font-medium">Escolha o Produto</label>
                    <select
                        name="product_id"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        <option value="" disabled>Selecione um produto para excluir</option>
                        {delProduct.length > 0 ? (
                            delProduct.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhum Produto Disponível ou Carregando!</option>
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-20">Excluir</Button>
            </form>
        </>
    );
};
