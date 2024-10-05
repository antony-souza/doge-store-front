import { useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";

//Implementar o a seleção de id do produto
export const FormUpdateProduct = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const productService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const filteredFormData = new FormData();
        let hasData = false;

        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
                hasData = true;
            }
        });

        if (!hasData) {
            toast({
                title: "Erro",
                description: "Nenhum campo foi preenchido. Por favor, preencha pelo menos um campo.",
                variant: "destructive",
            });
            return;
        }

        try {
            await productService.updateProduct(filteredFormData);

            toast({
                title: "Sucesso",
                description: "O produto foi atualizado com sucesso!",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            console.error(error);
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
                        <option value="quantity">Quantidade</option>
                        <option value="description">Descrição</option>
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
                            name="price"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Preço do produto"
                        />
                    </div>
                )}

                {selectedField === "quantity" && (
                    <div>
                        <label className="block text-sm font-medium">Quantidade</label>
                        <input
                            type="number"
                            name="quantity"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Quantidade em estoque"
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

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
