'use client';
import InputsCase from "@/app/components/case-input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UserService from "../services/user.service";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import LayoutForm from "@/app/components/layout-form";

function FormEditPerfil() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        image_url: "",
        name: "",
        email: "",
        password: ""
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setIsFormValid(Object.values({ ...formData, [name]: value }).some(field => field.trim() !== ""));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const filteredFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        const { email, password } = formData;
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            toast({
                title: 'Falha ao atualizar',
                description: 'Por favor, insira um email válido.',
                variant: 'destructive',
            });
            return;
        }

        if (password && password.length < 6) {
            toast({
                title: 'Falha ao atualizar',
                description: 'A senha deve ter pelo menos 6 caracteres.',
                variant: 'destructive',
            });
            return;
        }

        if (!isFormValid) {
            toast({
                title: 'Falha ao atualizar',
                description: 'Preencha ao menos um campo para atualizar',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        try {
            const service = new UserService();
            const response = await service.updateProfile(filteredFormData);

            if (!response) {
                toast({
                    title: 'Erro',
                    description: 'Erro ao atualizar perfil, não teve resposta do servidor',
                    variant: 'destructive',
                });
            }
            toast({
                title: 'Sucesso',
                description: 'Perfil atualizado com sucesso',
            });
        } catch (error) {
            toast({
                title: 'Erro',
                description: 'Erro ao atualizar perfil, falha de comunicação com o servidor',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-start mt-5">
                <LayoutForm onSubmit={handleFormSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Foto (Clicar para selecionar)"
                            type="file"
                            name="image_url"
                            placeholder="Alterar foto"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Nome"
                            type="text"
                            name="name"
                            placeholder="Digite seu novo nome"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Email"
                            type="text"
                            name="email"
                            placeholder="Digite seu novo email"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="Digite a nova senha"
                            onChange={handleChange}
                        />
                        <div className="flex justify-end w-60">
                            <Button
                                disabled={loading || !isFormValid}
                                className={loading ? 'bg-gray-300 cursor-not-allowed' : ''}
                            >
                                {loading ? 'Carregando...' : 'Salvar'}
                            </Button>
                        </div>
                    </div>
                </LayoutForm>
            </div>
        </>
    );
}

export default FormEditPerfil;
