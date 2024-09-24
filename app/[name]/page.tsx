
import { notFound } from 'next/navigation';
import { SearchProduct } from '../components/home/search-product';
import { CategoryList } from '../components/home/category-list';
import { FeaturedProducts } from '../components/home/featured-products';
import CompanyInformation from '../components/home/company-information';

export interface IParams {
  name: string;
}

export default function StorePage({ params }: { params: IParams }) {
  const { name } = params;


  if (!name) {
    notFound(); // Exibe uma página 404 se o parâmetro não estiver presente
  }

  return (
    <>
      <CompanyInformation name={name} />
      <SearchProduct name={name} />
      <CategoryList name={name} />
      <FeaturedProducts name={name} />
    </>
  );
}