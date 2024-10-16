"use client"
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory } from "../services/user.service";
import { Button } from "@/components/ui/button";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";

export const FormCreateProductAdmin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [store, setStore] = useState<IStore[]>([]);
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
        const fetchCategory = async () => {
            try {
                const productService = new UserService();
                const response = await productService.getAllCategories(selectedStoreID);
                setCategories(response);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };
        if (selectedStoreID) {
            fetchCategory();
        }
    }, [selectedStoreID]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        if (!form.checkValidity()) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios!"
            });
            return;
        }

        try {
            const productService = new UserService();
            const response = await productService.createProduct(formData);

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
            console.error("Erro ao criar produto:", error);
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
                <div className="pt-3 mt-5">
                    <label className="block text-sm font-medium">Escolha a loja a ser mapeada</label>
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
                </div>
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
                            <option value="" disabled>Nenhuma categoria disponível</option>
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
