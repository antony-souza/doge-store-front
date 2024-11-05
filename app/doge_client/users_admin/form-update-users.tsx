import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService, { IUsers } from "../services/admin.service";
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";
import InputsCase from "@/app/components/case-input";
import LayoutForm from "@/app/components/layout-form";
import validateMessages from "@/app/util/errorMessages";
import withAuth from "@/app/util/withToken";
import { Form } from "react-hook-form";

const adminService = new AdminService();
const userService = new UserService();

export interface IUpdateUsersProps {
    id: string;
}

function FormUpdateUsers({ id }: IUpdateUsersProps) {
    const [users, setUsers] = useState<IUsers[]>([]);
    const [companies, setCompanies] = useState<IStore[]>([]);
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [formData, setFormData] = useState({
        image_url: "",
        name: "",
        email: "",
        password: "",
        role: "",
        store_id: "",
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await adminService.getAllUsers();
                const companiesResponse = await adminService.getAllStore();
                setUsers(usersResponse);
                setCompanies(companiesResponse);
            } catch (error) {
                toast({
                    title: "Erro ao carregar dados",
                    description: "Não foi possível carregar usuários ou lojas. Tente novamente mais tarde.",
                    variant: "destructive",
                });
            }
        };
        fetchData();
    }, [users, companies]);

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
            const response = await userService.updateUser(filteredFormData, id);

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

                    <div className="flex flex-col font-semibold gap-3 w-60">
                        <label htmlFor="store">{`Nível de Permissão ⚠️`}</label>
                        <select
                            name="role"
                            id="role"
                            className="p-2 border border-gray-300 rounded-md"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option disabled>Selecione a Permissão</option>
                            <option value="user">Usuário</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div className="flex flex-col font-semibold gap-3 w-60">
                        <label htmlFor="store">{`Loja(Opcional)`}</label>
                        <select
                            name="store_id"
                            id="store"
                            className="p-2 border border-gray-300 rounded-md"
                            value={formData.store_id}
                            onChange={handleChange}
                        >
                            <option value={''}>Selecione uma loja</option>
                            {companies.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
        </>
    );
};

export default FormUpdateUsers;
