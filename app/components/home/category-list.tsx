'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IParams } from '@/app/[name]/page';

interface QueryStore {
  storeName: string;
}

interface Category {
  id: string;
  name: string;
  image_url: string[];
}

export function CategoryList({ name }: IParams) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      if (!name) return; // Não buscar até que o nome da loja esteja presente

      try {
        const encodedStoreName = encodeURIComponent(name);
        const response = await fetch(`http://localhost:4200/public/search_store?name=${encodedStoreName}`);
        const data = await response.json();

        // Acessando categorias dentro do array da loja
        const storeData = data[0]; // A estrutura é um array de lojas, pegar a primeira loja(item 0 :))
        const categories = storeData.category || []; // Acessando a lista de categorias
        setCategories(categories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, [name]); // storeName como dependência 

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1; // Velocidade de rolagem
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full mt-4">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Categorias:</h2>
      {isLoading ? (
        <div className="text-center text-lg animate-pulse">Carregando Categorias...</div>
      ) : (
        <div
          className="overflow-x-scroll flex hide-scrollbar pr-3 pl-3"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center mx-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4">
                <Image
                  src={category.image_url[0]} 
                  alt={category.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-center mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
