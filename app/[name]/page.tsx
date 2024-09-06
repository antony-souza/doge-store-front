import { CompanyInformation } from '@/app/components/home/company-information';
import { notFound } from 'next/navigation';
import { SearchProduct } from '../components/home/search-product';
import { CategoryList } from '../components/home/category-list';
import { FeaturedProducts } from '../components/home/featured-products';

interface PageParams {
  name: string;
}

export default function StorePage({ params }: { params: PageParams }) {
  const { name } = params;

 
  if (!name) {
    notFound(); // Exibe uma página 404 se o parâmetro não estiver presente
  }

  return (
    <>
      <CompanyInformation storeName={name} />
      <SearchProduct storeName={name}/>
      <CategoryList storeName={name}/>
      <FeaturedProducts storeName={name}/>
    </>
  );
}