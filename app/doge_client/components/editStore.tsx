import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditStoreProps {
    store: {
        id: number;
        name: string;
        phone: string;
        address: string;
        image_url: string;
        is_open: boolean;
        description: string;
        background_color: string;
    } | null;
    onClose: () => void;
}

export default function EditStore({ store, onClose }: EditStoreProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState(true);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode implementar a lógica de envio do formulário e do arquivo de imagem

        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Editar Loja</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Telefone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded w-full p-2"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Endereço</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border rounded w-full p-2"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Cor de Fundo</label>
                        <input
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Imagem</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isOpen}
                                onChange={(e) => setIsOpen(e.target.checked)}
                                className="mr-2"
                            />
                            Loja Aberta
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <Button type="submit">
                            Salvar
                        </Button>
                        <Button type="button" onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
