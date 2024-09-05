// app/[name]/page.tsx
import { CompanyInformation } from '@/app/components/home/company-information';
import { notFound } from 'next/navigation';
import { SearchProduct } from '../components/home/search-product';

interface PageParams {
  name: string;
}

export default function StorePage({ params }: { params: PageParams }) {
  const { name } = params;

  // Verifica se o nome está presente
  if (!name) {
    notFound(); // Exibe uma página 404 se o parâmetro não estiver presente
  }

  return (
    <>
      <CompanyInformation storeName={name} />
      <SearchProduct storeName={name}/>
    </>
  );
}