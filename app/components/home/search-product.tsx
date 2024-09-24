'use client'

import { IParams } from '@/app/[name]/page';
import { useState, useEffect } from 'react';

export function SearchProduct({ name }: IParams) {
  const [searchProduct, setSearchProduct] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // Ajuste o tipo conforme necessário
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      if (searchProduct.trim() === '') return; // Evita busca vazia

      setIsLoading(true);

      try {
        const response = await fetch(`http://localhost:4200/store/${name}/products?search=${searchProduct}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchProduct, name]);

  return (
    <div className="w-full mt-4 flex justify-center pt-2">
      <div className="relative w-3/4">
        <input
          type="text"
          className="w-full p-2 pl-10 border border-gray-300 rounded"
          placeholder="Pesquisar produtos..."
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          onFocus={() => setShowSearch(true)}
        />
        <span className="material-symbols-outlined absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>

        {isLoading && <div className="text-center text-lg">Carregando...</div>}
        {products.length > 0 && (
          <ul className="mt-2">
            {products.map((product) => (
              <li key={product.id} className="border-b border-gray-300 py-2">
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
