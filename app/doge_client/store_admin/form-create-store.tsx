import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminService, { IUsers } from "../services/admin.service";
import { IStore } from "@/app/util/interfaces-global.service";

export const FormCreateStore = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [users, setUsers] = useState<IUsers[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllUsers();
                setUsers(response);
            } catch (error) {
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const adminService = new AdminService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        
        formData.append("user_id", selectedUser);

        if (!form.checkValidity()) {
            toast({
                title: "Erro - Campos obrigatórios",
                description: "Por favor, preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        try {
            await adminService.createStore(formData);

            toast({
                title: "Sucesso",
                description: "A loja foi criada com sucesso!",
                variant: "default",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
            setSelectedUser(""); // Resetar o usuário selecionado após o envio
        } catch (error) {
            (error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar a loja. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5" noValidate>
                <div>
                    <label className="block text-sm font-medium">Foto da Loja</label>
                    <input
                        type="file"
                        name="image_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Banner de Fundo</label>
                    <input
                        type="file"
                        name="banner_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nome da Loja</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Nome da loja"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Telefone</label>
                    <input
                        type="text"
                        name="phone"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Telefone da loja"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Endereço</label>
                    <input
                        type="text"
                        name="address"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Endereço da loja"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Descrição</label>
                    <textarea
                        name="description"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Descrição da loja"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Cor da Loja</label>
                    <input
                        type="color"
                        name="background_color"
                        className="mt-1 block w-full p-2 border rounded-md h-10"
                        style={{ width: "200px" }}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Escolha o usuário responsável</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="" disabled>Selecione um usuário</option>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhum usuário disponível</option>
                        )}
                    </select>
                </div>
                <Button type="submit" className="w-20">Criar</Button>
            </form>
        </>
    );
};
