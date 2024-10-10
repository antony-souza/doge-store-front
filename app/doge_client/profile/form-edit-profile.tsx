import { useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";

export const FormUpdateProfile = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedField === "password" && password !== confirmPassword) {
            toast({
                title: "Erro",
                description: "As senhas não coincidem. Por favor, verifique e tente novamente.",
                variant: "destructive",
            });
            return;
        }

        const userService = new UserService();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const filteredFormData = new FormData();
        let dataExists = false;

        // Adiciona os campos ao FormData, excluindo os vazios
        formData.forEach((value, key) => {
            if (value) {
                filteredFormData.append(key, value);
                dataExists = true;
            }
        });

        if (!dataExists) {
            toast({
                title: "Erro - Campos Vazios",
                description: "Nenhum campo foi preenchido. Por favor, preencha pelo menos um campo.",
                variant: "destructive",
            });
            return;
        }

        try {
            await userService.updateProfile(filteredFormData);

            toast({
                title: "Sucesso",
                description: "O perfil foi atualizado com sucesso!",
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
                title: "Erro",
                description: "Houve um problema ao atualizar o perfil. Tente novamente.",
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
                        <option value="image_url">Foto</option>
                        <option value="name">Nome</option>
                        <option value="email">Email</option>
                        <option value="password">Senha</option>
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

                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
