import { use, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import { IUpdateStore } from "@/app/util/interfaces-global.service";

const userService = new UserService();

interface IFormUpdateStoreProps {
    id: string;
}

export const FormUpdateStore = ({ id }: IFormUpdateStoreProps) => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [open_time, setOpenTime] = useState("");
    const [close_time, setCloseTime] = useState("");
    const [address, setAddress] = useState("");
    const [image_url, setImageUrl] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [banner_url, setBannerUrl] = useState<File | null>(null);

    const dataForm: IUpdateStore = {
        name: name,
        phone: phone,
        address: address,
        image_url: image_url,
        description: description,
        banner_url: banner_url,
        open_time: open_time,
        close_time: close_time,
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        try {
            Object.entries(dataForm).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            })

            const userService = new UserService();
            await userService.updateStore(id, formData);
            toast({
                title: "Sucesso!",
                description: "Loja atualizada com sucesso.",
                variant: "default"
            })
        } catch (error) {
            toast({
                title: "Erro!",
                description: "Não foi possível atualizar a loja.",
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (name || phone || open_time || close_time || address || image_url || description || banner_url) {
            setBtnActive(true);
        } else {
            setBtnActive(false);
        }
    }, [name, phone, open_time, close_time, address, image_url, description, banner_url]);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputsCase
                            label="Imagem da Loja"
                            name="image_url"
                            type="file"
                            placeholder="Imagem da loja"
                            onChange={(e) => setImageUrl(e.target.files?.[0] as File)}
                        />
                        <InputsCase
                            label="Banner da loja"
                            name="banner_url"
                            type="file"
                            placeholder="Banner da loja"
                            onChange={(e) => setBannerUrl(e.target.files?.[0] as File)}
                        />
                        <InputsCase
                            label="Horário de abertura"
                            name="open_time"
                            type="time"
                            placeholder="Descrição"
                            value={open_time}
                            onChange={(e) => setOpenTime(e.target.value)}
                        />
                        <InputsCase
                            label="Horário de fechamento"
                            name="close_time"
                            type="time"
                            placeholder="Horário de fechamento"
                            value={close_time}
                            onChange={(e) => setCloseTime(e.target.value)}
                        />
                        <InputsCase
                            label="Descrição"
                            name="description"
                            type="text"
                            placeholder="Descrição"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <InputsCase
                            label="Endereço"
                            name="address"
                            type="text"
                            placeholder="Endereço"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <InputsCase
                            label="Telefone"
                            name="phone"
                            type="text"
                            placeholder="Telefone"
                            onChange={(e) => setPhone(e.target.value)}
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
