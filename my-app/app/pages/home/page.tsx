'use client'

import {CompanyInformation} from "@/app/components/home/company-information";
import {MenuOptions} from "@/app/components/home/menu-options";
import {SearchProduct} from "@/app/components/home/search-product";

export function Home() {
    return<>
        <CompanyInformation />
        <SearchProduct />
        <MenuOptions />
    </>
}