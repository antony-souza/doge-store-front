import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminService, { IUsers } from "../services/admin.service";
import { IStore } from "@/app/util/interfaces-global.service";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import Image from "next/image";
import validateMessages from "@/app/util/errorMessages";

export const FormCreateUser = () => {
    const [store, setStore] = useState<IStore[]>([]);
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [formData, setFormData] = useState({
        image_url: "",
        name: "",
        email: "",
        password: "",
        role: "user",
        store_id: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setBtnActive(Object.values(formData).some((inputValue) => inputValue.trim() !== ""));

        if (name === "email") {
            const isValidEmail = /\S+@\S+\.\S+/.test(value);
            setErrorEmail(!isValidEmail);
        }

        if (name === "password") {
            setErrorPassword(value.length < 6);
        }
    };

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStore(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStore();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const adminService = new AdminService();
        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            setLoading(true);
            await adminService.createUser(formData);
   
            toast({
                title: "Sucesso",
                description: "O usuário foi criado com sucesso!",
                variant: "default",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar o usuário. Tente novamente.",
                variant: "destructive",
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
                                    {store.map((store) => (
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
};
