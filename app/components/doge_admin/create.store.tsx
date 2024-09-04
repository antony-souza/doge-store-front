// components/CreateStore.tsx
import React, { useState } from 'react';

const apiUrl = String(process.env.API_URL); // Certifique-se de usar NEXT_PUBLIC_ para variáveis de ambiente no Next.js

export function CreateStore() {
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [storeName, setStoreName] = useState('');
    const [configName, setConfigName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storeData = {
      name: storeName,
      store_config: {
        name: configName,
        phone: phone,
        address: address,
        description: description,
        is_open: isOpen,
        image_url: imageUrl,
        background_color: backgroundColor
      }
    };

    try {
      const response = await fetch("http://localhost:4200/store/create/store", {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeData)
      });

      if (response.status === 400) {
        const data = await response.json();
        setFailMessage(data || 'Produto já existe! Edite o produto na opção "Editar Produto"');
        setTimeout(() => setFailMessage(''), 10000);
        return;
    }

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

        const data = await response.json();
        console.log('Success:', data);

      setSuccessMessage('Loja criada com sucesso!');
      setTimeout(() => setSuccessMessage(''), 10000); 
    } catch (error) {
        setFailMessage('Erro ao criar o produto. Por favor, tente novamente.');
        setTimeout(() => setFailMessage(''), 10000); 
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Criar Loja</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nome da Loja</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nome da Configuração</label>
          <input
            type="text"
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Endereço</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Está Aberto?</label>
          <select
            value={isOpen ? 'true' : 'false'}
            onChange={(e) => setIsOpen(e.target.value === 'true')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">URL da Imagem</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Cor de Fundo</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Criar Loja
          </button>
        </div>
      </form>
      {successMessage && (
                <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50">
                    {successMessage}
                </div>
            )}

            {failMessage && (
                <div className="fixed top-4 right-4 bg-red-500 text-white py-2 px-4 rounded shadow-lg z-50">
                    {failMessage}
                </div>
            )}
    </div>
  );
}

export default CreateStore;