import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormDeleteProduct = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [delProduct, setDelProduct] = useState<IUpdateProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productService = new UserService();
                const response = await productService.getAllProducts();
                setDelProduct(response);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchProducts();
    }, []);

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
                setDelProduct([]); 
            } else {
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
