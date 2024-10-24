import { useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { DecodedToken } from "../services/user.service";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

export const FormUpdateStore = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const filteredFormData = new FormData();

        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        if (!form) {
            toast({
                title: "Erro",
                description: "Nenhum campo foi preenchido. Por favor, preencha pelo menos um campo.",
                variant: "destructive",
            });
            return;
        }

        try {

            const id = localStorage.getItem("store_id") as string;
            await userService.updateStore(id, filteredFormData);

            toast({
                title: "Sucesso",
                description: "A loja foi atualizada com sucesso!",
            });

            if (formRef.current) {
                formRef.current.reset()
            }
        } catch (error) {
            (error);
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar a loja. Tente novamente.",
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
                        <option value="image_url">Foto da Loja</option>
                        <option value="banner_url">Banner da Loja</option>
                        <option value="name">Nome da Loja</option>
                        <option value="phone">Telefone</option>
                        <option value="description">Descrição</option>
                        <option value="background_color">Cor da Loja</option>
                    </select>
                </div>

                {selectedField === "image_url" && (
                    <div>
                        <label className="block text-sm font-medium">Foto da Loja</label>
                        <input
                            type="file"
                            name="image_url"
                            className="mt-1 block w-full p-2 border rounded-md"
                            accept="image/*"
                        />
                    </div>
                )}

                {selectedField === "banner_url" && (
                    <div>
                        <label className="block text-sm font-medium">Banner da Loja</label>
                        <input
                            type="file"
                            name="banner_url"
                            className="mt-1 block w-full p-2 border rounded-md"
                            accept="image/*"
                        />
                    </div>
                )}

                {selectedField === "name" && (
                    <div>
                        <label className="block text-sm font-medium">Nome da Loja</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Nome da loja"
                        />
                    </div>
                )}

                {selectedField === "phone" && (
                    <div>
                        <label className="block text-sm font-medium">Telefone</label>
                        <input
                            type="text"
                            name="phone"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Telefone"
                        />
                    </div>
                )}

                {selectedField === "description" && (
                    <div>
                        <label className="block text-sm font-medium">Descrição</label>
                        <textarea
                            name="description"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Descrição da loja"
                        />
                    </div>
                )}

                {selectedField === "background_color" && (
                    <div>
                        <label className="block text-sm font-medium">Cor da Loja</label>
                        <input
                            type="color"
                            name="background_color"
                            className="mt-1 block w-full p-2 border rounded-md h-10"
                            style={{ width: "200px" }}
                        />
                    </div>
                )}

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
