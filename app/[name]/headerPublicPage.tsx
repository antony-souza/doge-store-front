"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // usePathname é importante aqui
import Link from "next/link";
import Image from "next/image";

interface HeaderList {
    path?: string;
    icon: string;
    name?: string;
}

export interface IPropsHeaderPublic {
    name: string;
}

export default function HeaderPublicPage({ name }: IPropsHeaderPublic) {
    const store = encodeURIComponent(name);
    const router = useRouter();
    const pathname = usePathname(); // Para obter a rota atual
    const [headerMenu, setHeaderMenu] = useState<HeaderList[]>([
        {
            icon: "arrow_back",
        },
        {
            icon: "shopping_cart",
        },
    ]);

    const imageUrl = "https://i.imgur.com/fUfBPtY.png";

    const handleRouterBack = () => {
        const previousUrl = document.referrer;
        if (previousUrl.includes(store)) {
            router.back();
        }
    };

    // Verifique se a rota atual já é a página do carrinho
    const isOnCartPage = pathname === `/${encodeURIComponent(store)}/cart`;

    return (
        <div className="flex fixed w-full justify-between h-14 items-center bg-white p-6 rounded-lg shadow-lg z-10 overflow-hidden">
            <div className="flex items-center">
                <Link
                    href={''}
                    onClick={handleRouterBack}
                    className="text-gray-700 hover:text-gray-900 flex items-center"
                >
                    <span className="material-symbols-outlined text-xl">{headerMenu[0].icon}</span>
                </Link>
            </div>
            <div className="flex items-center justify-center flex-1">
                <Image
                    src={imageUrl}
                    alt="Store Logo"
                    width={40}
                    height={40}
                    className="rounded-full border-4 border-white"
                />
            </div>
            <div className="flex items-center">
                {/* Se já estiver na página do carrinho, o href será removido */}
                {isOnCartPage ? (
                    <div className="text-gray-700 flex items-center cursor-default">
                        <span className="material-symbols-outlined text-xl">{headerMenu[1].icon}</span>
                        <span className="ml-2">{headerMenu[1].name}</span>
                    </div>
                ) : (
                    <Link
                        href={`/${store}/cart`}
                        className="text-gray-700 hover:text-gray-900 flex items-center"
                    >
                        <span className="material-symbols-outlined text-xl">{headerMenu[1].icon}</span>
                        <span className="ml-2">{headerMenu[1].name}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
