'use client';

import { IParams } from '@/app/[name]/page';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Função para formatar números como moeda brasileira
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface Product {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  description: string;
}

interface FeaturedProduct {
  store_id: string;
  product: Product[];
}

export function FeaturedProducts({ name }: IParams) {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedStoreName = encodeURIComponent(name);
        const response = await fetch(`http://localhost:4200/public/search_store?name=${encodedStoreName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch featured items');
        }
        const data = await response.json();
        const storeData = data[0];
        setFeaturedProducts(storeData.featured_products); // Atualize a tela com os produtos em destaque na posição [0]
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [name]);

  // Agrupa todos os produtos em um único array. Map cria um array de outros array. Flat transforma em um único array.
  const groupedItems = featuredProducts.flatMap((featured) => featured.product);

  return (
    <div className="w-full mt-8 mb-20">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Produtos em Destaque</h2>
      {isLoading ? (
        <div className="text-center text-lg animate-pulse">Carregando Itens...</div>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap pr-10 pl-7">
          <div className="inline-flex space-x-4">
            {groupedItems.length === 0 ? (
              <div className="text-center text-lg">Nenhum produto em destaque</div>
            ) : (
              groupedItems.map((item) => (
                <div key={item.id} className="inline-block w-48 p-4 border rounded-lg shadow-lg">
                  <div className="flex justify-center items-center mb-2 w-24 h-24 relative overflow-hidden bg-gray-100">
                    <Image
                      src={item.image_url[0]}
                      alt={item.name}
                      layout="fill" // Preenche o contêiner
                      objectFit="cover" // Cobre o contêiner sem distorcer
                      className="rounded" // Adiciona bordas arredondadas se necessário
                    />
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <h3 className="text-lg font-semibold break-words">{item.name}</h3>
                  <p className="text-md text-green-400">{formatCurrency(item.price)}</p>
                  <p className="text-sm text-gray-600 break-words whitespace-normal">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
