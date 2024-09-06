'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  description: string;
}

interface FeaturedProduct {
  product: Product[];
}

interface QueryStore {
  storeName: string;
}

export function FeaturedProducts({ storeName }: QueryStore) {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const encodedStoreName = encodeURIComponent(storeName);
        const response = await fetch(`http://localhost:4200/public/featured-products?storeName=${encodedStoreName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch featured items');
        }
        const data = await response.json();
        
        setFeaturedProducts(data); // O backend já retorna no formato adequado
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [storeName]);

  // Agrupa todos os produtos em um único array. Map cria um array de outros array. Flat transforma em um único array.
  // O flatMap faz isso em um único passo.
  const groupedItems = featuredProducts.flatMap((featured) => featured.product); 

  return (
    <div className="w-full mt-8 mb-20">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Produtos Destaque</h2>
      {isLoading ? (
        <div className="text-center text-lg animate-pulse">Carregando Itens...</div>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="inline-flex space-x-4">
            {groupedItems.map((item, array) => (
              <div key={array} className="inline-block w-48 p-4 border rounded-lg shadow-lg">
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
                <p className="text-md text-green-400">R$ {item.price}</p>
                <p className="text-sm text-gray-600 break-words whitespace-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
