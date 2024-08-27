// my-app/app/components/home/search-product.tsx
'use client'
import { useState } from 'react';

export function SearchProduct() {
  const [searchProduct, setSearchProduct] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-full mt-4 flex justify-center">
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
      </div>
    </div>
  );
}