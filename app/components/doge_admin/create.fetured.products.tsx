import React, { useState } from 'react';

interface IFeaturedProduct {
    store_id: string;
    product_ids: string[];
}

export default function CreateFeaturedProducts() {
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [storeId, setStoreId] = useState('');
    const [productIds, setProductIds] = useState<string[]>(['']);

    const handleProductIdsChange = (index: number, value: string) => {
        const newProductIds = [...productIds];
        newProductIds[index] = value;
        setProductIds(newProductIds);
    };

    const handleAddProductId = () => {
        setProductIds([...productIds, '']);
    };

    const handleRemoveProductId = (index: number) => {
        const newProductIds = productIds.filter((_, i) => i !== index);
        setProductIds(newProductIds);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeId) {
            setFailMessage('Você precisa fornecer um ID de loja.');
            setTimeout(() => setFailMessage(''), 10000);
            return;
        }

        const featuredProductData: IFeaturedProduct = {
            store_id: storeId,
            product_ids: productIds,
        };

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setFailMessage('Você precisa estar logado para criar produtos.');
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const response = await fetch('http://localhost:4200/store/create/featured-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(featuredProductData),
            });

            if (!response.ok) {
                setFailMessage("Erro ao criar produtos!");
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const data = await response.json();
            console.log('Success:', data);

            setStoreId('');
            setProductIds(['']);

            setSuccessMessage('Produtos criados com sucesso!');
            setTimeout(() => setSuccessMessage(''), 10000);
        } catch (error) {
            setFailMessage('Erro ao criar produtos. Por favor, tente novamente.');
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
                <h2 className="text-3xl font-semibold text-gray-100">Criar Produtos Em Destaque</h2>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {productIds.map((id, index) => (
                        <div key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-900">
                            <div>
                                <label className="block text-gray-300 font-medium mb-2">ID do Produto</label>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => handleProductIdsChange(index, e.target.value)}
                                    className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveProductId(index)}
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
                        onClick={handleAddProductId}
                        className="bg-green-600 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Adicionar Novo ID de Produto
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-700 text-gray-100 py-3 px-6 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Criar Destaque
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
