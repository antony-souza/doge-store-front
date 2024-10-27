import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory, IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormUpdateProduct = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedProduct, setSelectedProductId] = useState<string | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [products, setProducts] = useState<IUpdateProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [price, setPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryService = new UserService();
                const id = localStorage.getItem('store_id');
                const response = await categoryService.getAllCategories(id as string);
                setCategories(response);
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Houve um problema ao buscar as categorias.",
                    variant: "destructive",
                })
            }
        };
        fetchCategory();
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productService = new UserService();
                const id = localStorage.getItem('store_id');
                const response = await productService.getAllProducts(id as string);
                setProducts(response);
            } catch (error) {
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const productService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const filteredFormData = new FormData();

        // Adiciona os campos ao FormData, excluindo os vazios
        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });
    
        if (!form) {
            toast({
                title: "Erro - Campos Vazios",
                description: "Nenhum campo foi preenchido. Por favor, preencha pelo menos um campo.",
                variant: "destructive",
            });
            return;
        }

        if (!selectedProduct) {
            toast({
                title: "Erro",
                description: "Selecione um produto para atualizar.",
                variant: "destructive",
            });
            return;
        }

        try {
            await productService.updateProduct(selectedProduct, filteredFormData);

            toast({
                title: "Sucesso",
                description: "O produto foi atualizado com sucesso!",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            (error);
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar o produto. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium">Escolha o produto para editar</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedProduct || ""}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                    >
                        <option value="" disabled>Selecione um produto</option>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <option key={index} value={product.id}>
                                    {product.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhum produto disponível</option>
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Escolha o campo para editar</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedField || ""}
                        onChange={(e) => setSelectedField(e.target.value)}
                    >
                        <option value="" disabled>Selecione um campo</option>
                        <option value="image_url">Foto do Produto</option>
                        <option value="name">Nome do Produto</option>
                        <option value="price">Preço</option>
                        <option value="description">Descrição</option>
                        <option value="category">Categoria</option>
                        <option value="featured_products">Destaque</option>
                    </select>
                </div>

                {selectedField === "image_url" && (
                    <div>
                        <label className="block text-sm font-medium">Foto do Produto</label>
                        <input
                            type="file"
                            name="image_url"
                            className="mt-1 block w-full p-2 border rounded-md"
                            accept="image/*"
                        />
                    </div>
                )}

                {selectedField === "name" && (
                    <div>
                        <label className="block text-sm font-medium">Nome do Produto</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Nome do produto"
                        />
                    </div>
                )}

                {selectedField === "price" && (
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
                )}

                {selectedField === "description" && (
                    <div>
                        <label className="block text-sm font-medium">Descrição</label>
                        <textarea
                            name="description"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Descrição do produto"
                        />
                    </div>
                )}

                {selectedField === "category" && (
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
                )}

                {selectedField === "featured_products" && (
                    <div>
                        <label className="block text-sm font-medium">O produto está em destaque?</label>
                        <select
                            name="featured_products"
                            className="mt-1 block w-full p-2 border rounded-md"
                            defaultValue=''
                        >
                            <option value="" disabled>Selecione uma opção</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                )}

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
