'use client';
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";
import { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { toast } from "@/hooks/use-toast";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import AdminService, { IUsers } from "../services/admin.service";
import { Button } from "@/components/ui/button";
import SelectCase from "@/app/components/case-select";

const FormCreateStoreAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [open_time, setOpenTime] = useState("");
    const [close_time, setCloseTime] = useState("");
    const [address, setAddress] = useState("");
    const [image_url, setImageUrl] = useState<File | null>(null);
    const [banner_url, setBannerUrl] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState<IUsers[]>([]);

    const formObejct = {
        name: name,
        phone: phone,
        open_time: open_time,
        close_time: close_time,
        address: address,
        image_url: image_url,
        banner_url: banner_url,
        description: description,
        user_id: userId,
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllUsers();
                setUsers(response);
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Houve um problema ao buscar os usuários.",
                    variant: "destructive",
                });
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);

        const formData = new FormData();

        Object.entries(formObejct).forEach(([key, value]) => {
            if(value){
                formData.append(key, value);
            }
        })

        try {
            const adminService = new AdminService();
            await adminService.createStore(formData);

            toast({
                title: "Sucesso!",
                description: "Loja criada com sucesso.",
                variant: "default"
            })

        } catch (error) {
            console.log(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar a loja.",
                variant: "destructive",
            });
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
            <div className="pt-5">
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Nome"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Foto da Loja"
                            name="image_url"
                            type="file"
                            onChange={(e) => setImageUrl(e.target.files?.[0] as File)}
                            required
                        />
                        <InputsCase
                            label="Banner da Loja"
                            name="banner_url"
                            type="file"
                            onChange={(e) => setBannerUrl(e.target.files?.[0] as File)}
                            required
                        />
                        <InputsCase
                            label="Horário de Abertura"
                            name="open_time"
                            type="time"
                            value={open_time}
                            onChange={(e) => setOpenTime(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Horário de Fechamento"
                            name="close_time"
                            type="time"
                            value={close_time}
                            onChange={(e) => setCloseTime(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Endereço"
                            name="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Telefone"
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Descrição"
                            name="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <SelectCase
                            name="user_id"
                            label="Escolha um usuário"
                            value={userId}
                            options={[
                                { value: "", label: "Selecione um usuário" },
                                ...users.map((user) => ({
                                    value: user.id,
                                    label: user.name,
                                })),
                            ]}
                            onChange={(e) => setUserId(e.target.value)}
                            required
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
                </LayoutForm>
            </div>
        </>
    )
};

export default FormCreateStoreAdmin;