import { use, useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory, IUpdateProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";

export const FormCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState<File>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            const userService = new UserService();
            const formData = new FormData();

            formData.append("name", name);
            formData.append("image_url", imageFile as File);
            formData.append("store_id", localStorage.getItem("store_id") as string);

            await userService.createCategory(formData);

            toast({
                title: "Sucesso",
                description: "Categoria criada com sucesso.",
                variant: "default"
            });

        } catch (error) {
            console.log(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar a categoria.",
                variant: "destructive",
            });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (name || imageFile) {
            setBtnActive(true);
        }
    }, [name, imageFile]);

    return (
        <>
            <div>
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Nome"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Imagem"
                            name="image_url"
                            type="file"
                            onChange={(e) => setImageFile(e.target.files?.[0] as File)}
                            required
                        />
                        <div className="flex justify-end w-60 mt-5">
                            <Button
                                type="submit"
                                disabled={loading || !btnActive}
                                className={loading ? "bg-gray-300 cursor-not-allowed" : ""}
                            >
                                {loading ? "Carregando..." : "Salvar"}
                            </Button>
                        </div>
                    </div>
                </LayoutForm>
            </div>
            <Toaster />

        </>
    );
};
