'use client'

import Image from 'next/image';
import { pathImages } from "@/app/components/home/path-image";

const featuredItems = [
  { name: 'Pizza', image: pathImages.pizza, price: 'R$10.00', description: 'Deliciosa pizza com queijo e pepperoni.' },
  { name: 'Hamburger', image: pathImages.hamburger, price: 'R$8.00', description: 'Hamburger suculento com alface e tomate.' },
  { name: 'Burritos', image: pathImages.burritos, price: 'R$7.00', description: 'Burritos recheados com carne e feijão.' },
  // Adicione mais itens em destaque conforme necessário
];

export function FeaturedItemsList() {
  const groupedItems = [];
  for (let i = 0; i < featuredItems.length; i += 2) {
    groupedItems.push(featuredItems.slice(i, i + 2));
  }

  return (
    <div className="w-full mt-8 mb-20">
      <h2 className="text-start text-2xl font-bold mb-4 pl-8">Itens em Destaque</h2>
      <div className="flex justify-center flex-wrap">
        {groupedItems.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-wrap justify-center w-full">
            {group.map((item, index) => (
              <div key={index} className="m-4 p-4 border rounded-lg shadow-lg w-48">
                <div className="flex justify-center">
                  <img src={item.image} alt={item.name} width={100} height={100} className="mb-2" />
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
    </div>
  );
}