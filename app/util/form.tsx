import { toast } from "react-toastify";
import UserService from "../doge_client/services/user.service";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";

export const FormLayout = () => {
    const [form, setForm] = useState<FormData[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userService = new UserService();
        const formData = new FormData(event.currentTarget);

        try {
            await userService.updateStore(formData);
            toast.success('Loja atualizada com sucesso!');
        } catch (error) {
            console.error(error);
            toast.error('Falha ao atualizar loja');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Nome da Loja</label>
                <input
                    type="file"
                    name="Foto"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Nome da loja"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Nome da Loja</label>
                <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Nome da loja"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Telefone</label>
                <input
                    type="text"
                    name="phone"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Telefone"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                    name="description"
                    className="mt-1 block w-full p-2 border rounded-md"
                    placeholder="Descrição da loja"
                />
            </div>

            <Button type="submit" className="w-20">Salvar</Button>
        </form>
    );
}
