import React, { useState } from 'react';

interface IProduct {
    name: string;
    image_url: string[];
    description: string;
    price: string; // O valor será uma string para manipulação mais fácil
    category_id: string;
}

interface ICategoriesAndBody {
    store_id: string;
    products: IProduct[];
}

export default function CreateProduct() {
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [storeId, setStoreId] = useState('');
    const [products, setProducts] = useState<IProduct[]>([
        { category_id: '', name: '', image_url: [''], description: '', price: 'R$ 0,00' }
    ]);

    const formatCurrency = (value: string) => {
        // Remove todos os caracteres não numéricos
        const cleanValue = value.replace(/[^\d]/g, '');
        
        // Formata para o formato de moeda (real brasileiro)
        const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        const formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', options);
        
        // Retorna o valor formatado com o prefixo "R$"
        return `R$ ${formattedValue}`;
    };

    const handleCategoryChange = (index: number, field: string, value: string) => {
        const newProducts = [...products]; // Faz uma cópia do array original de produtos

        const handlers: { [key: string]: (value: string) => any } = {
            category_id: (value: string) => { newProducts[index].category_id = value; },
            name: (value: string) => { newProducts[index].name = value; },
            image_url: (value: string) => { newProducts[index].image_url = value.split(',').map(url => url.trim()); },
            description: (value: string) => { newProducts[index].description = value; },
            price: (value: string) => { 
                // Atualiza o preço formatado enquanto o usuário digita
                newProducts[index].price = formatCurrency(value);
            },
        };

        if (handlers[field]) {
            handlers[field](value);
        }

        setProducts(newProducts);
    };

    const handleAddProducts = () => {
        setProducts([...products, { category_id: '', name: '', image_url: [''], description: '', price: 'R$ 0,00' }]);
    };

    const handleRemoveCategory = (index: number) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) {
            setFailMessage('Você precisa fornecer um ID de loja.');
            setTimeout(() => setFailMessage(''), 10000);
            return;
        }

        const categoryData: ICategoriesAndBody = {
            store_id: storeId,
            products: products.map(p => ({
                ...p,
                price: p.price.replace(/[^\d,]/g, '').replace(',', '.') // Converte o preço formatado para um número decimal
            })),
        };

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setFailMessage('Você precisa estar logado para criar categorias.');
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const response = await fetch('http://localhost:4200/store/create/product', {
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
            setProducts([{ category_id: '', name: '', image_url: [''], description: '', price: 'R$ 0,00' }]);

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
                    add_business
                </span>
                <h2 className="text-3xl font-semibold text-gray-100">Criar Produto</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">ID da Loja</label>
                    <input
                        type="text"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        className="w-2/4 p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {products.map((product, index) => (
                        <div key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-900">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">ID da Categoria</label>
                                    <input
                                        type="text"
                                        value={product.category_id}
                                        onChange={(e) => handleCategoryChange(index, 'category_id', e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Nome do Produto</label>
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">URL da Imagem</label>
                                    <input
                                        type="text"
                                        value={product.image_url.join(', ')}
                                        onChange={(e) => handleCategoryChange(index, 'image_url', e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Descrição</label>
                                    <input
                                        type="text"
                                        value={product.description}
                                        onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-medium mb-2">Preço</label>
                                    <input
                                        type="text"
                                        value={product.price} // O valor já vem formatado
                                        onChange={(e) => handleCategoryChange(index, 'price', e.target.value)} // Formata o valor enquanto o usuário digita
                                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveCategory(index)}
                                className="mt-2 text-red-500 hover:underline"
                            >
                                Remover Produto
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleAddProducts}
                        className="bg-green-600 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Adicionar Novo Produto
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Criar Produto
                    </button>
                </div>

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
            </form>
        </div>
    );
}
