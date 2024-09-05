"use client";

import React, { useEffect, useState } from 'react';

interface Store {
  id: string;
  name: string;
}

export const SearchStore: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`http://localhost:4200/store/find/store?store_name=${searchTerm}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        // Verifica se a resposta é um array
        if (Array.isArray(data)) {
          setStores(data);
        } else {
          console.error('Resposta do servidor não é um array:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar lojas:', error);
      }
    };

    fetchStores();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-white text-3xl mb-4">Buscar Lojas</h1>
      <input
        type="text"
        placeholder="Buscar loja..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 rounded border border-gray-600"
      />

      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID da Loja</th>
            <th className="py-2 px-4 border-b">Nome da Loja</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.length === 0 ? (
            <tr>
              <td colSpan={2} className="py-4 text-center">Nenhuma loja encontrada</td>
            </tr>
          ) : (
            filteredStores.map(store => (
              <tr key={store.id} className="hover:bg-gray-700">
                <td className="py-2 px-4 border-b">{store.id}</td>
                <td className="py-2 px-4 border-b">{store.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
