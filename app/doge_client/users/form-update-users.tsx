import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService, { IUsers } from "../services/admin.service";
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";

export const FormUpdateUsers = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
    const [users, setUsers] = useState<IUsers[]>([]);
    const [companies, setCompanies] = useState<IStore[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminService = new AdminService();
                const usersResponse = await adminService.getAllUsers();
                const companiesResponse = await adminService.getAllStore();
                setUsers(usersResponse);
                setCompanies(companiesResponse);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar usuários ou lojas. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedField === "password" && password !== confirmPassword) {
            toast({
                title: "Erro de Senha",
                description: "As senhas inseridas não coincidem. Verifique e tente novamente.",
                variant: "destructive",
            });
            return;
        }

        const userService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const filteredFormData = new FormData();

        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        if (!form.checkValidity()) {
            toast({
                title: "Campos Vazios",
                description: "Por favor, preencha pelo menos um campo antes de salvar.",
                variant: "destructive",
            });
            return;
        }

        try {
            await userService.updateProfile(filteredFormData);

            toast({
                title: "Sucesso na Atualização",
                description: "As informações do perfil foram atualizadas com sucesso!",
                variant: "default",
            });

            if (formRef.current) {
                formRef.current.reset();
            }
            setSelectedField(null);
            setPassword(null);
            setConfirmPassword(null);
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao Atualizar Perfil",
                description: "Houve um problema ao tentar atualizar o perfil. Por favor, tente novamente.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div>
                    <label className="block text-sm font-medium">Escolha o usuário para editar</label>
                    <select
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedUserId || ""}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        <option value="" disabled>Selecione um usuário</option>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <option key={index} value={user.id}>
                                    {user.name}
                                </option>
                            ))
                        ) : (
                            <option value="">Nenhum usuário disponível</option>
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
                        <option value="image_url">Foto</option>
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="password">Senha</option>
                        <option value="role">Role</option>
                        <option value="store_id">Loja</option>
                    </select>
                </div>

                {selectedField === "image_url" && (
                    <div>
                        <label className="block text-sm font-medium">Foto do Perfil</label>
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
                        <label className="block text-sm font-medium">Nome de Usuário</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Nome do perfil"
                        />
                    </div>
                )}

                {selectedField === "email" && (
                    <div>
                        <label className="block text-sm font-medium">Email de Usuário</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full p-2 border rounded-md"
                            placeholder="Email do perfil"
                        />
                    </div>
                )}

                {selectedField === "password" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">Senha</label>
                            <input
                                type="password"
                                name="password"
                                className="mt-1 block w-full p-2 border rounded-md"
                                placeholder="Digite sua nova senha"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
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
                            />
                        </div>
                    </>
                )}

                {selectedField === "role" && (
                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            name="role"
                            className="mt-1 block w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Selecione a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Usuário</option>
                        </select>
                    </div>
                )}

                {selectedField === "store_id" && (
                    <div>
                        <label className="block text-sm font-medium">Loja (Empresa)</label>
                        <select
                            name="store_id"
                            className="mt-1 block w-full p-2 border rounded-md"
                        >
                            <option value="" disabled>Selecione a loja</option>
                            {companies.length > 0 ? (
                                companies.map((company, index) => (
                                    <option key={index} value={company.id}>
                                        {company.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">Nenhuma loja disponível</option>
                            )}
                        </select>
                    </div>
                )}

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
