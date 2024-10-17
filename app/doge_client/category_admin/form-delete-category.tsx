import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service";

export const FormDeleteCategoryAdmin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [delCategory, setDelCategory] = useState<IUpdateProduct[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
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
        const fetchCategory = async () => {
            try {
                const productService = new UserService();
                const response = await productService.getAllCategories(selectedStoreID);
                setDelCategory(response);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };
        fetchCategory();
    }, [selectedStoreID]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedCategory) {
            toast({
                title: "Seleção de categoria",
                description: "Por favor, selecione uma categoria para deletar.",
                variant: "destructive",
            });
            return;
        }

        const productService = new UserService();

        try {
            const response = await productService.deleteProduct(selectedCategory);

            if (response) {
                toast({
                    title: "Categoria deletada com sucesso!",
                    description: "A categoria foi desativada.",
                    variant: "default",
                });
                formRef.current?.reset();
            }

            if (!response) {
                toast({
                    title: "Erro ao deletar categoria",
                    description: "Verifique os dados e tente novamente.",
                    variant: "destructive",
                });
            }

        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
            toast({
                title: "Erro no servidor",
                description: "Ocorreu um erro ao deletar a categoria.",
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
                    <label className="block text-sm font-medium">Escolha a Categoria</label>
                    <select
                        name="category_id"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma categoria para excluir</option>
                        {delCategory.length > 0 ? (
                            delCategory.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhuma Categoria Disponível ou Carregando!</option>
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-20">Excluir</Button>
            </form>
        </>
    );
};
