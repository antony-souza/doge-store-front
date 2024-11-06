import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, { ICategory } from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import SelectCase from "@/app/components/case-select";

export const FormCreateProduct = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState<File>();
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(false);

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
                });
            }
        };
        fetchCategory();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const productService = new UserService();
        const formData = new FormData();

        formData.append('name', name);
        formData.append('image_url', imageFile as File);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category_id', categoryId);

        const storeId = localStorage.getItem("store_id") as string;
        if (storeId) {
            formData.append('store_id', storeId);
        }

        try {
            const response = await productService.createProduct(storeId, formData);
            console.log(response);
            toast({
                title: "Sucesso",
                description: "O produto foi criado com sucesso!",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Erro",
                description: "Houve um problema ao criar o produto. Tente novamente.",
                variant: "destructive",
            });
        } finally {
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
                            value={name}
                            placeholder="Nome do produto"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Imagem do Produto"
                            name="image_url"
                            type="file"
                            onChange={(e) => setImageFile(e.target.files?.[0] as File)} 
                            required
                        />
                        <InputsCase
                            label="Preço do Produto"
                            name="price"
                            type="number"
                            value={price}
                            placeholder="Preço do produto"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <InputsCase
                            label="Descrição do Produto"
                            name="description"
                            type="text"
                            value={description}
                            placeholder="Descrição do produto"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <SelectCase
                            name="category_id"
                            label="Escolha uma categoria"
                            value={categoryId}
                            options={[
                                { value: "", label: "Selecione uma categoria" },
                                ...categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                })),
                            ]}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end w-60 mt-5">
                        <Button
                            disabled={loading}
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
