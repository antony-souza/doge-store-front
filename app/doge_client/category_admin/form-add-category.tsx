"use client"
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory } from "../services/user.service";
import { Button } from "@/components/ui/button";
import { IStore } from "@/app/util/interfaces-global.service";
import AdminService from "../services/admin.service";

export const FormAddCatergoryAdmin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [store, setStore] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStore(response);
            } catch (error) {
                
            }
        };
        fetchStore();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        if (!form.checkValidity()) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios para adicionar a categoria!",
            });
            return;
        }

        try {
            const productService = new UserService();
            const response = await productService.createCategory(formData);

            if (response) {
                toast({
                    title: "Categoria criada com sucesso!",
                    description: "A categoria foi adicionada à lista.",
                    variant: "default",
                });
                formRef.current?.reset();
            } else {
                toast({
                    title: "Erro ao criar categoria",
                    description: "Verifique os dados e tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Erro no servidor",
                description: "Ocorreu um erro ao enviar os dados para a categoria.",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div className="pt-3 mt-5">
                    <label className="block text-sm font-medium">Escolha a loja</label>
                    <select
                        name="store_id"
                        className="mt-1 block w-200 p-2 border rounded-md"
                        value={selectedStoreID}
                        onChange={(e) => setSelectedStoreID(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma loja</option>
                        {store.length > 0 ? (
                            store.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhuma Loja Disponível!</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Foto da Categoria</label>
                    <input
                        type="file"
                        name="image_url"
                        className="mt-1 block w-full p-2 border rounded-md"
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nome da Categoria</label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Nome da categoria"
                        required
                    />
                </div>
                <Button type="submit" className="w-20">Salvar</Button>
            </form>
        </>
    );
};
