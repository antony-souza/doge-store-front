import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import AdminService, { IUsers } from "../services/admin.service";

export const FormDeleteUsers = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [user, setUser] = useState<IUsers[]>([]);
    const [selectedUserID, setSelectedUserID] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const adminService = new AdminService();
                const response = await adminService.getAllUsers();
                setUser(response);
            } catch (error) {
                console.error("Erro ao buscar os usuários:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!selectedUserID) {
            toast({
                title: "Seleção de Usuário",
                description: "Por favor, selecione um usuário para excluir.",
                variant: "destructive",
            });
            return;
        }

        const adminService = new AdminService();

        try {
            const response = await adminService.deleteUser(selectedUserID); 

            if (response) {
                toast({
                    title: "Usuário Excluído",
                    description: "O usuário foi excluído com sucesso.",
                    variant: "default",
                });
                formRef.current?.reset();
                setUser([]); 
            } else {
                toast({
                    title: "Erro ao Excluir Usuário",
                    description: "Ocorreu um erro ao excluir o usuário. Tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
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
                    <label className="block text-sm font-medium">Escolha o Usuário</label>
                    <select
                        name="user_id"
                        className="mt-1 block w-full p-2 border rounded-md"
                        value={selectedUserID}
                        onChange={(e) => setSelectedUserID(e.target.value)}
                    >
                        <option value="" disabled>Selecione um usuário para excluir</option>
                        {user.length > 0 ? (
                            user.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Nenhum Usuário Disponível ou Carregando!</option>
                        )}
                    </select>
                </div>

                <Button type="submit" className="w-20">Excluir</Button>
            </form>
        </>
    );
};
