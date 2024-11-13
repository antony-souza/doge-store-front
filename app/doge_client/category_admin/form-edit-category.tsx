import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";

interface IFormProps {
    categoryId: string;
}

export const FormUpdateCategoryAdmin = ({ categoryId }: IFormProps) => {
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [imageUrl, setImageUrl] = useState<File>();
    const [name, setName] = useState("");

    const formObject = {
        name: name,
        image_url: imageUrl,
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userService = new UserService();
            const formData = new FormData();

            Object.entries(formObject).forEach(([key, value]) => {
                if (value) {
                    formData.append(key, value);
                }
            });

            await userService.updateCategory(formData, categoryId);

            toast({
                title: "Sucesso",
                description: "Categoria atualizada com sucesso!",
                variant: "default",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar a categoria.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (name || imageUrl) {
            setBtnActive(true);
        }
        else {
            setBtnActive(false);
        }

    }, [name, imageUrl]);

    return (
        <>
            <div className="mt-5">
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Nome"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <InputsCase
                            label="Imagem"
                            name="image_url"
                            type="file"
                            onChange={(e) => setImageUrl(e.target.files?.[0])}
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
                <Toaster />
            </div>
        </>
    );
};
