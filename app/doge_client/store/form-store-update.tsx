import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service";
import { IStore } from "@/app/util/interfaces-global.service";
import SelectCase from "@/app/components/case-select";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";

const userService = new UserService();

interface IFormUpdateStoreProps {
    id: string;
}

export const FormUpdateStore = ({ id }: IFormUpdateStoreProps) => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        image_url: "",
        banner_url: "",
        description: "",
        address: "",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setBtnActive(Object.values({ ...formData, [name]: value })
            .some((inputValue) => inputValue.trim() !== ""));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const filteredFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        try {
            await userService.updateStore(id, filteredFormData);
            toast({
                title: "Sucesso",
                description: "A loja foi atualizada com sucesso!",
            });

        } catch (error) {
            (error);
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar a loja. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <div className="mt-5">
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Nome da Loja"
                            name="name"
                            type="text"
                            placeholder="Nome da loja"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Imagem da Loja"
                            name="image_url"
                            type="file"
                            placeholder="Imagem da loja"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Banner da loja"
                            name="banner_url"
                            type="file"
                            placeholder="Banner da loja"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Descrição"
                            name="description"
                            type="text"
                            placeholder="Descrição"
                            onChange={handleChange}
                        />

                        <InputsCase
                            label="Endereço"
                            name="address"
                            type="text"
                            placeholder="Endereço"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Telefone"
                            name="phone"
                            type="text"
                            placeholder="Telefone"
                            onChange={handleChange}
                        />
                        <div className="flex justify-end w-60 mt-5">
                            <Button
                                disabled={loading || !btnActive}
                                className={loading ? 'bg-gray-300 cursor-not-allowed' : ''}
                            >
                                {loading ? 'Carregando...' : 'Salvar'}
                            </Button>
                        </div>
                    </div>
                </LayoutForm >
            </div>
            <Toaster />
        </>

    );
};
