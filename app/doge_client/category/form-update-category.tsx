import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormUpdateCategory = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedCategoryID, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [category, setCategory] = useState<IUpdateProduct[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const productService = new UserService();
                const response = await productService.getAllCategories();
                setCategory(response);
            } catch (error) {
                console.error("Erro ao buscar os produtos:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const productService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const filteredFormData = new FormData();
        let data = false;

        // Adiciona os campos ao FormData, excluindo os vazios
        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
                data = true;
            }
        });

        if (!data) {
            toast({
                title: "Erro - Campos Vazios",
                description: "Nenhum campo foi preenchido. Por favor, preencha pelo menos um campo.",
                variant: "destructive",
            });
            return;
        }

        if (!selectedCategoryID) {
            toast({
                title: "Erro",
                description: "Selecione uma categoria para atualizar.",
                variant: "destructive",
            });
            return;
        }

        try {
            await productService.updateCategory(filteredFormData, selectedCategoryID);

            toast({
                title: "Sucesso",
                description: "A categoria foi atualizado com sucesso!",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
            setSelectedCategoryId(null);
            setSelectedField(null);
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar a categoria. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium">Escolha a categoria para editar</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedCategoryID || ""}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
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
                        <option value="image_url">Foto da Categoria</option>
                        <option value="name">Nome da Categoria</option>
                    </select>
                </div>

                {selectedField === "image_url" && (
                    <div>
                        <label className="block text-sm font-medium">Foto da Categoria</label>
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
                            placeholder="Nome do produto"
                        />
                    </div>
                )}
                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
