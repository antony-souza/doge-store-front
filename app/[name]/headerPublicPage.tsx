"use client";
import { useState } from "react"; // Não se esqueça de importar useState
import { routes } from "@/router";
import Link from "next/link";

interface HeaderList {
    path: string;
    icon: string;
    name?: string;
}

interface IPropsHeaderPublic {
    name: string;
}

export default function HeaderPublicPage({ name }: IPropsHeaderPublic) {
    const [headerRouter, setHeaderRouter] = useState<HeaderList[]>([
        {
            path: routes.CART,
            icon: "shopping_cart",
            name: "Carrinho",
        },
    ]);

    const store = name;

    return (
        <div className="flex fixed w-full justify-center h-14 items-center bg-white p-6 rounded-lg shadow-lg z-10">
            <div className="flex justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex-1 flex justify-center items-center">
                    {headerRouter.map((menu, index) => (
                        <Link
                            key={index}
                            href={menu.path.replace('[name]', store)}
                            className="text-gray-700 hover:text-gray-900 flex items-center"
                        >
                            <span className="material-symbols-outlined text-xl">{menu.icon}</span>
                            <span className="ml-2">{menu.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
