'use client'

import {CompanyInformation} from "@/app/components/home/company-information";
import {MenuOptions} from "@/app/components/home/menu-options";
import {SearchProduct} from "@/app/components/home/search-product";
import {CategoryList} from "@/app/components/home/category-list";
import {FeaturedItemsList} from "@/app/components/home/featureItem-destaque";

export function Home() {
    return<>
        <CompanyInformation />
        <SearchProduct />
        <CategoryList />
        <FeaturedItemsList />
        <MenuOptions />
    </>
}

//só deus sabe como ta a mente do palhaço que fez isso