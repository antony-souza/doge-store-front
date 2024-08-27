'use client'

import {CompanyInformation} from "@/app/components/home/company-information";
import {MenuOptions} from "@/app/components/home/menu-options";

export function Home() {
    return<>
        <CompanyInformation />
        <MenuOptions />
    </>
}