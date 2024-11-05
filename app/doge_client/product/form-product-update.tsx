import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory, IProduct } from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import SelectCase from "@/app/components/case-select";
import { formatPrice } from "@/app/util/formt-price";

interface IFormUpdateProductProps {
    id: string;
}

export const FormUpdateProduct = ({ id }: IFormUpdateProductProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [btnActive, setBtnActive] = useState(false);
    const [formData, setFormData] = useState({
        name:"",
        image_url: "",
        banner_url: "",
        price: '',
        description: "",
        category_id: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        setBtnActive(Object.values({ ...formData, [name]: value })
            .some((inputValue) => inputValue.trim() !== ""));
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryService = new UserService();
                const idStore = localStorage.getItem("store_id") as string;
                const response = await categoryService.getAllCategories(idStore);
                setCategories(response);
            } catch (error) {
                toast({
                    title: "Erro",
                    description: "Houve um problema ao buscar as categorias.",
                    variant: "destructive",
                })
            }
        };
        fetchCategory();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);

        const productService = new UserService();
        const filteredFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                filteredFormData.append(key, value);
            }
        });

        try {
            await productService.updateProduct(id, filteredFormData);
            toast({
                title: "Sucesso",
                description: "O produto foi atualizado com sucesso!",
            });
        }
        catch (error) {
            toast({
                title: "Erro",
                description: "Houve um problema ao atualizar o produto. Tente novamente.",
                variant: "destructive",
            });
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster />
            <div className="mt-5">
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <InputsCase
                            label="Nome do Produto"
                            name="name"
                            type="text"
                            value={formData.name}
                            placeholder="Nome do produto"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Foto do Produto"
                            name="image_url"
                            type="file"
                            placeholder="Foto do produto"
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Preço do Produto"
                            name="price"
                            type="number"
                            placeholder="Preço do produto"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <InputsCase
                            label="Descrição do Produto"
                            name="description"
                            type="textara"
                            value={formData.description}
                            placeholder="Nome do produto"
                            onChange={handleChange}
                        />
                        <SelectCase
                            name="category_id"
                            label="Escolha uma categoria"
                            value={formData.category_id}
                            options={[
                                { value: "", label: "Selecione uma categoria" },
                                ...categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                })),
                            ]}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-end w-60 mt-5">
                        <Button
                            disabled={loading || !btnActive}
                            className={loading ? 'bg-gray-300 cursor-not-allowed' : ''}
                        >
                            {loading ? 'Carregando...' : 'Salvar'}
                        </Button>
                    </div>
                </LayoutForm>
            </div>

        </>
    );
};
