import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import UserService, {
  ICategory,
  IProduct,
  IUpdateProduct,
} from "../services/user.service";
import { Button } from "@/components/ui/button";
import LayoutForm from "@/app/components/layout-form";
import InputsCase from "@/app/components/case-input";
import SelectCase from "@/app/components/case-select";

interface IFormUpdateProductProps {
  id: string;
}

export const FormUpdateProduct = ({ id }: IFormUpdateProductProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [btnActive, setBtnActive] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [promotion, setPromotion] = useState("");

  const formObject: IUpdateProduct = {
    name: name,
    image_url: imageFile,
    price: price,
    description: description,
    category_id: category_id,
    promotion: promotion,
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
        });
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const productService = new UserService();
    const filteredFormData = new FormData();

    Object.entries(formObject).forEach(([key, value]) => {
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
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Houve um problema ao atualizar o produto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name || imageFile || price || description || category_id || promotion) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [name, imageFile, price, description, category_id, promotion]);

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
            />
            <InputsCase
              label="Foto do Produto"
              name="image_url"
              type="file"
              placeholder="Foto do produto"
              onChange={(e) => setImageFile(e.target.files?.[0] as File)}
            />
            <InputsCase
              label="Preço do Produto"
              name="price"
              type="number"
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputsCase
              label="Descrição do Produto"
              name="description"
              type="text"
              value={description}
              placeholder="Nome do produto"
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectCase
              name="category_id"
              label="Escolha uma categoria"
              value={category_id}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <SelectCase
              name="promotion"
              label="Produto em destaque"
              value={promotion}
              options={[
                { value: "", label: "Selecione uma opção" },
                { value: "true", label: "Sim" },
                { value: "false", label: "Não" },
              ]}
              onChange={(e) => setPromotion(e.target.value)}
            />
          </div>
          <div className="flex justify-end w-60 mt-5">
            <Button
              disabled={loading || !btnActive}
              className={loading ? "bg-gray-300 cursor-not-allowed" : ""}
            >
              {loading ? "Carregando..." : "Salvar"}
            </Button>
          </div>
        </LayoutForm>
      </div>
    </>
  );
};
