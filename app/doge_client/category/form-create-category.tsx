import {useRef} from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormCreateCategory = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const store_id = localStorage.getItem('store_id');
        
        if (store_id) {
            // Adiciona o store_id ao FormData
            formData.append("store_id", store_id);
        } else {
            toast({
                title: "Erro",
                description: "Store ID não encontrado. Verifique o localStorage."
            });
            return;
        }
        
        // Validação de campos obrigatórios
        const name = formData.get("name")?.toString().trim();
        const image = formData.get("image_url");


        if (!name || !image) {
            toast({
                title: "Erro ao criar categoria",
                description: "Todos os campos obrigatórios devem ser preenchidos.",
                variant: "destructive",
            });
            return;
        }

        try {
            const productService = new UserService();
            const response = await productService.createCategory(formData);
            
            if (response) {
                toast({
                    title: "Categoria criada com sucesso!",
                    description: "A categoria foi adicionado à lista.",
                    variant: "default",
                });
                formRef.current?.reset();
            } else {
                toast({
                    title: "Erro ao criar categoria",
                    description: "Verifique os dados e tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
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
                    <label className="block text-sm font-medium">Foto da Categoria</label>
                    <input
                        type="file"
                        name="image_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nome da Categoria</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Nome da categoria"
                    />
                </div>
                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
