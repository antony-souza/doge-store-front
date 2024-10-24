import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminService from "../services/admin.service"; 
import { IStore } from "@/app/util/interfaces-global.service";

export const FormDeleteStores = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [stores, setStores] = useState<IStore[]>([]);
    const [selectedStoreID, setSelectedStoreID] = useState<string>("");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllStore();
                setStores(response);
            } catch (error) {
                ("Erro ao buscar as lojas:", error);
                toast({
                    title: "Erro ao buscar lojas",
                    description: "Não foi possível carregar a lista de lojas.",
                    variant: "destructive",
                });
            }
        };
        fetchStores();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedStoreID) {
            toast({
                title: "Seleção de Loja",
                description: "Por favor, selecione uma loja para excluir.",
                variant: "destructive",
            });
            return;
        }

        const adminService = new AdminService();

        try {
            const response = await adminService.deleteStore(selectedStoreID); 

            if (response) {
                toast({
                    title: "Loja Excluída",
                    description: "A loja foi excluída com sucesso.",
                    variant: "default",
                });
                formRef.current?.reset();
                setStores((prev) => prev.filter(store => store.id !== selectedStoreID)); // Atualiza a lista de lojas
            } else {
                toast({
                    title: "Erro ao Excluir Loja",
                    description: "Ocorreu um erro ao excluir a loja. Tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            ("Erro ao excluir loja:", error);
            toast({
                title: "Erro no Servidor",
                description: "Houve um problema ao processar sua solicitação. Tente novamente mais tarde.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4 mt-5">
                <div className="pt-3">
                    <label className="block text-sm font-medium">Escolha a Loja</label>
                    <select
                        name="store_id"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedStoreID}
                        onChange={(e) => setSelectedStoreID(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma loja para excluir</option>
                        {stores.length > 0 ? (
                            stores.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhuma Loja Disponível ou Carregando!</option>
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-20">Excluir</Button>
            </form>
        </>
    );
};
