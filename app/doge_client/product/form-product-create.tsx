import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormCreateProduct = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productService = new UserService();
                const id = localStorage.getItem('store_id');
                const response = await productService.getAllCategories(id as string);
                setCategories(response);
            } catch (error) {
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        // Validação de campos obrigatórios

        const storeId = localStorage.getItem('store_id');
        
        if (storeId) {
            formData.append("store_id", storeId);
        } else {
            toast({
                title: "Erro",
                description: "Store ID não encontrado. Verifique o localStorage."
            });
            return;
        }

        try {
            const productService = new UserService();
            const id = localStorage.getItem('store_id');
            const response = await productService.createProduct(formData, id as string);

            if (response) {
                toast({
                    title: "Produto criado com sucesso!",
                    description: "O produto foi adicionado à lista.",
                    variant: "default",
                });
                formRef.current?.reset();
                setPrice(null);
            } else {
                toast({
                    title: "Erro ao criar produto",
                    description: "Verifique os dados e tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Erro no servidor",
                description: "Ocorreu um erro ao enviar os dados."
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium">Foto do Produto</label>
                    <input
                        type="file"
                        name="image_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nome do Produto</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Nome do produto"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Preço</label>
                    <input
                        type="number"
                        step="any"
                        value={price || ""}
                        name="price"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="R$ 0,00"
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descrição</label>
                    <textarea
                        name="description"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Descrição do produto"
                    />
                    <div className="pt-3">
                        <label className="block text-sm font-medium">Escolha a categoria</label>
                        <select
                            name="category_id"
                            className="mt-1 block w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Selecione uma categoria</option>
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhuma categoria disponível</option>
                            )}
                        </select>
                    </div>
                </div>

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
