"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // usePathname é importante aqui
import Link from "next/link";
import Image from "next/image";

interface HeaderList {
  path?: string;
  icon: string;
  name?: string;
}

export interface PageProps {  
  name: string;
  cartItemCount: number;
}

const HeaderPublicPage = ({ name, cartItemCount }: PageProps) => {
  const store = encodeURIComponent(name);
  const router = useRouter();
  const pathname = usePathname(); // Para obter a rota atual
  const [allowedGoBack, setAllowedGoBack] = useState<boolean>(false);
  const [headerMenu, setHeaderMenu] = useState<HeaderList[]>([
    {
      icon: "arrow_back",
    },
    {
      icon: "shopping_cart",
    },
  ]);

  const imageUrl = "https://i.imgur.com/fUfBPtY.png";

  useEffect(() => {
    const split = pathname.split("/");

    if (split.length >= 3) {
      setAllowedGoBack(true);
    } else {
      setAllowedGoBack(false);
    }
  }, [pathname]);

  const handleRouterBack = () => {
    if (allowedGoBack) {
      router.back();
    }
  };

  // Verifique se a rota atual já é a página do carrinho
  const isOnCartPage = pathname === `/${store}/cart`;

  return (
    <div className="flex fixed w-full justify-between h-14 items-center bg-white p-6 rounded-lg shadow-lg z-10 overflow-hidden">
      {allowedGoBack ? (
        <div className="flex items-center">
          <Link
            href={''}
            onClick={handleRouterBack}
            className="text-gray-700 hover:text-gray-900 flex items-center"
          >
            <span className="material-symbols-outlined text-xl">{headerMenu[0].icon}</span>
          </Link>
        </div>
      ) : undefined}

      <div className="flex items-center justify-center flex-1">
        <Image
          src={imageUrl}
          alt="Store Logo"
          priority
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
            {cartItemCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </div>
        ) : (
          <Link
            href={`/${store}/cart`}
            className="text-gray-700 hover:text-gray-900 flex items-center"
          >
            <span className="material-symbols-outlined text-xl">{headerMenu[1].icon}</span>
            {cartItemCount > 0 && (
              <span className="ml-2 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}

export default HeaderPublicPage;