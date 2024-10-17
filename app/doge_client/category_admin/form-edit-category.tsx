import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory, IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service";
import { IStore } from "@/app/util/interfaces-global.service";

export const FormUpdateCategoryAdmin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedCategoryID, setSelectCategoryID] = useState<string | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [store, setStore] = useState<IStore[]>([]);
    const [category, setCategory] = useState<ICategory[]>([]);
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
                setCategory(response);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };
        fetchCategory();
    }, [selectedStoreID]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const productService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const filteredFormData = new FormData();
  
        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        if (!form.checkValidity()) {
            toast({
                title: "Erro",
                description: "Nenhum campo foi preenchido. Por favor, preencha ao menos um campo antes de prosseguir.",
                variant: "destructive",
            });
            return;
        }

        if (!selectedCategoryID) {
            toast({
                title: "Erro",
                description: "Selecione uma categoria para atualização.",
                variant: "destructive",
            });
            return;
        }

        try {
            await productService.updateCategory(filteredFormData, selectedCategoryID);

            toast({
                title: "Sucesso",
                description: "A categoria foi atualizada com sucesso.",
            });
            formRef.current?.reset();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro",
                description: "Ocorreu um problema ao atualizar a categoria. Tente novamente.",
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
                            <option value="" disabled>Nenhuma loja disponível</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Escolha a categoria para editar</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedCategoryID || ""}
                        onChange={(e) => setSelectCategoryID(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma categoria</option>
                        {category.length > 0 ? (
                            category.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhuma categoria disponível</option>
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
                        <option value="image_url">Imagem da Categoria</option>
                        <option value="name">Nome da Categoria</option>
                    </select>
                </div>

                {selectedField === "image_url" && (
                    <div>
                        <label className="block text-sm font-medium">Imagem da Categoria</label>
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
                        <label className="block text-sm font-medium">Nome da Categoria</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Nome da categoria"
                        />
                    </div>
                )}
                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
