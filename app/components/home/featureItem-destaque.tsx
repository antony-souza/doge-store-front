'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FeaturedItem {
  name: string;
  image: string;
  price: number;
  description: string;
}

export function FeaturedItemsList() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/featured-items');
      const data: FeaturedItem[] = await response.json();
      setFeaturedItems(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const groupedItems = [];
  for (let i = 0; i < featuredItems.length; i += 2) {
    groupedItems.push(featuredItems.slice(i, i + 2));
  }

  return (
    <div className="w-full mt-8 mb-20">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Itens em Destaque</h2>
      {isLoading ? (
        <div className="text-center text-lg animate-pulse">Carregando Itens...</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          {groupedItems.map((group, groupIndex) => (
            <div key={groupIndex} className="flex justify-center w-full">
              {group.map((item, index) => (
                <div key={index} className="m-4 p-4 border rounded-lg shadow-lg w-48">
                  <div className="flex justify-center">
                    <Image src={item.image} alt={item.name} width={100} height={100} className="mb-2" />
                  </div>
                  <div className="border-t border-gray-300 my-2"></div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-md text-green-400">{item.price}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}