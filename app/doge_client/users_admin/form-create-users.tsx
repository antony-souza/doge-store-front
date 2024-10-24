import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service";
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";

export const FormCreateUser = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [store, setStore] = useState<IStore[]>([]);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStore(response);
            } catch (error) {
                ("Erro ao buscar as lojas:", error);
            }
        };
        fetchStore();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password && password !== confirmPassword) {
            toast({
                title: "Erro",
                description: "As senhas não coincidem. Por favor, verifique e tente novamente.",
                variant: "destructive",
            });
            return;
        }

        const adminService = new AdminService();
        const form = event.currentTarget;
        const formData = new FormData(form);

        if (!form.checkValidity()) {
            toast({
                title: "Erro - Campos obrigatórios",
                description: "Por favor, preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return;
        }

        try {
            await adminService.createUser(formData);

            toast({
                title: "Sucesso",
                description: "O usuário foi criado com sucesso!",
                variant: "default",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
            setPassword(null);
            setConfirmPassword(null);
        } catch (error) {
            (error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar o usuário. Tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5" noValidate>
                <div>
                    <label className="block text-sm font-medium">Foto do Perfil</label>
                    <input
                        type="file"
                        name="image_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nome de Usuário</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Nome do perfil"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email de Usuário</label>
                    <input
                        type="email"
                        name="email"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Email do perfil"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Senha</label>
                    <input
                        type="password"
                        name="password"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Digite sua nova senha"
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirmar Senha</label>
                    <input
                        type="password"
                        name="confirm_password"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Confirme sua nova senha"
                        value={confirmPassword || ""}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Função</label>
                    <select
                        name="role"
                        className="mt-1 block w-full p-2 border rounded-md"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">Usuário</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Loja</label>
                    <select
                        name="store"
                        className="mt-1 block w-full p-2 border rounded-md"
                    >
                        <option value="">Selecione uma loja (opcional)</option>
                        {store.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button type="submit" className="w-20">Enviar</Button>
            </form>
        </>
    );
};
