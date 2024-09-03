'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Category {
  image: string;
  name: string;
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('http://localhost:3000/api/categories');
      const data: Category[] = await response.json();
      setCategories(data);
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  const handleMouseDown = (e: any) => {
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

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 3; // Velocidade de rolagem
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full mt-4">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Categorias</h2>
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
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center mx-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4">
                <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
              </div>
              <p className="text-center mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}