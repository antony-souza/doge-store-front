import React, { useState } from 'react';

interface ICategory {
    name: string;
    image_url: string[];
}

interface ICategoriesAndBody {
    storeId: string;
    categories: ICategory[];
}

//Ta dando certo assim, então fala baixo negue
export function CreateCategories() {
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [storeId, setStoreId] = useState('');
    const [categories, setCategories] = useState<ICategory[]>([{ name: '', image_url: [''] }]);

    const handleCategoryChange = (index: number, field: string, value: string) => {
        const newCategories = [...categories];

        // Definindo um objeto de mapeamento para as alterações
        const handlers: { [key: string]: (value: string) => void } = {
            name: (value: string) => {
                newCategories[index].name = value;
            },
            image_url: (value: string) => {
                newCategories[index].image_url = value.split(',').map(url => url.trim());
                /* Removendo URLs vazias e negando espaços. Tive que fazer assim por virgula
                pq tu passou image_url como array na tabela */
            },
        };

        // Aplicando a função correspondente com base no campo
        //Em outras palavras, pega o name ou image_url e aplica a função correspondente
        if (handlers[field]) {
            handlers[field](value);
        }

        setCategories(newCategories);
    };

    const handleAddCategory = () => {
        setCategories([...categories, { name: '', image_url: [''] }]);
    };

    const handleRemoveCategory = (index: number) => {
        const newCategories = categories.filter((_, i) => i !== index);
        setCategories(newCategories);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) {
            setFailMessage('Você precisa fornecer um ID de loja.');
            setTimeout(() => setFailMessage(''), 10000);
            return;
        }

        const categoryData: ICategoriesAndBody = {
            storeId,
            categories,
        };

        try {

            const token = localStorage.getItem('token');

            if (!token) {
                setFailMessage('Você precisa estar logado para criar categorias.');
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const response = await fetch('http://localhost:4200/store/create/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(categoryData),
            });

            if (!response.ok) {
                setFailMessage("Erro ao criar categorias!");
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const data = await response.json();
            console.log('Success:', data);

            setStoreId('');
            setCategories([{ name: '', image_url: [''] }]);

            setSuccessMessage('Categorias criadas com sucesso!');
            setTimeout(() => setSuccessMessage(''), 10000);
        } catch (error) {
            setFailMessage('Erro ao criar categorias. Por favor, tente novamente.');
            setTimeout(() => setFailMessage(''), 10000);
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className='flex items-center gap-2 mb-3'>
                <span className="material-symbols-outlined text-3xl font-semibold text-gray-100">
                    category
                </span>
                <h2 className="text-3xl font-semibold text-gray-100">Criar Categorias</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">ID da Loja</label>
                    <input
                        type="text"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-900">
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">Nome da Categoria</label>
                                <input
                                    type="text"
                                    value={category.name}
                                    onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='pt-4'>
                                <label className="block text-gray-300 font-medium mb-2">URL da Imagem</label>
                                <input
                                    type="text"
                                    value={category.image_url.join(', ')}
                                    onChange={(e) => handleCategoryChange(index, 'image_url', e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveCategory(index)}
                                className="mt-2 text-red-500 hover:underline"
                            >
                                Remover Categoria
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-green-600 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Adicionar Nova Categoria
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-700 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Criar Categorias
                    </button>
                </div>
            </form>
            {successMessage && (
                <div className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg z-50">
                    {successMessage}
                </div>
            )}

            {failMessage && (
                <div className="fixed top-4 right-4 bg-red-600 text-white py-2 px-4 rounded shadow-lg z-50">
                    {failMessage}
                </div>
            )}
        </div>
    );
}

export default CreateCategories;
