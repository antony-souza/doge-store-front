'use client';
import InputsCase from "@/app/components/case-input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import UserService from "../services/user.service";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import LayoutForm from "@/app/components/layout-form";
import validateMessages from "@/app/util/errorMessages";
import Image from "next/image";
import withAuth from "@/app/util/withToken";

function FormEditPerfil() {
    const [loading, setLoading] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [formData, setFormData] = useState({
        image_url: "",
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setBtnActive(Object.values({ ...formData, [name]: value })
            .some((inputValue) => inputValue.trim() !== ""));

        if (name === "email") {
            const isValidEmail = /\S+@\S+\.\S+/.test(value);
            setErrorEmail(!isValidEmail);
        }

        if (name === "password") {
            setErrorPassword(value.length < 6);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const filteredFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        try {
            const service = new UserService();
            const getUser = localStorage.getItem('user')
            const id = JSON.parse(String(getUser)).id as string;
            const response = await service.updateUser(filteredFormData, id);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-between mt-5">
                <div className="flex flex-col w-1/2 p-5">
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
                                type="email"
                                name="email"
                                placeholder="Digite seu novo email"
                                onChange={handleChange}
                            />
                            {errorEmail ? (
                                <span className="text-red-500">{validateMessages.emailError}</span>
                            ) : (
                                <span className="text-slate-700">{validateMessages.emailValid}</span>
                            )}
                            <InputsCase
                                label="Senha"
                                type="password"
                                name="password"
                                minLength={6}
                                placeholder="Digite a nova senha"
                                onChange={handleChange}
                            />
                            {errorPassword ? (
                                <span className="text-red-500">{validateMessages.passwordError}</span>
                            ) : (
                                <span className="text-slate-700">{validateMessages.passwordValid}</span>
                            )}
                            <div className="flex justify-end w-60">
                                <Button
                                    disabled={loading || !btnActive}
                                    className={loading ? 'bg-gray-300 cursor-not-allowed' : ''}
                                >
                                    {loading ? 'Carregando...' : 'Salvar'}
                                </Button>
                            </div>
                        </div>
                    </LayoutForm>
                </div>
                <div className="relative w-1/2 h-full p-5">
                    <Image
                        src="https://i.imgur.com/fUfBPtY.png"
                        alt="store_logo"
                        width={300}
                        height={300}
                        className="opacity-20"
                    />
                </div>
            </div>
        </>
    );
}

export default withAuth(FormEditPerfil);
