import { useRef } from "react";
import { toast } from "react-toastify";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormUpdateStore = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

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

        try {
            await userService.updateStore(filteredFormData);
            toast.success('Loja atualizada com sucesso!');

            if (formRef.current) {
                formRef.current.reset();
            }

        } catch (error) {
            console.error(error);
            toast.error('Falha ao atualizar loja');
        }
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Foto da Loja</label>
                <input
                    type="file"
                    name="image_url"
                    className="mt-1 block w-full p-2 border rounded-md"
                    accept="image/*"
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

            <div>
                <label className="block text-sm font-medium">Cor da Loja</label>
                <input
                    type="color"
                    name="background_color"
                    className="mt-1 block w-full p-2 border rounded-md h-10"
                    style={{ width: '200px' }}
                />
            </div>

            <Button type="submit" className="w-20">Salvar</Button>
        </form>
    );
};
