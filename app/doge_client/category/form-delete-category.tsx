import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormDeleteCategory = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [delCategory, setDelCategory] = useState<ICategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryService = new UserService();
                const response = await categoryService.getAllCategories();
                setDelCategory(response);
            } catch (error) {
                console.error("Erro ao buscar as categorias:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedCategoryId) {
            toast({
                title: "Seleção de categoria",
                description: "Por favor, selecione uma categoria para excluir.",
                variant: "destructive",
            });
            return;
        }

        const categoryService = new UserService();

        try {
            const response = await categoryService.deleteCategory(selectedCategoryId); 

            if (response) {
                toast({
                    title: "Categoria deletada com sucesso!",
                    description: "A categoria foi desativada.",
                    variant: "default",
                });
                formRef.current?.reset();
                setDelCategory([]);
            } else {
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
                <div className="pt-3">
                    <label className="block text-sm font-medium">Escolha a Categoria</label>
                    <select
                        name="category_id"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
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
