'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface IMenuList{
    path: string,
    icon: string,
    name: string
}

interface IDashboardProps{
    isSidebarOpenProps?: boolean
}

const Dashboard: React.FC<IDashboardProps> = ({ isSidebarOpenProps }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(isSidebarOpenProps ?? true);
    const [menuList, setMenuList] = useState<IMenuList[]>([
        {
            path: "/doge_client/home/store",
            icon: "store",
            name: "Loja"
        },
        {
            path: "",
            name: "Categorias",
            icon: "category"   
        },
        {
            path: "/doge_client/product",
            name: "Produtos",
            icon: "inventory"   
        },
        {
            path: "",
            name: "Destaques",
            icon: "star"   
        },
    ]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderItemMenu = (menu: IMenuList, index: number) => {
        return (
            <div key={index} className='mt-2' onClick={toggleSidebar}>
               {/* TODO Quando não tiver path setado deixar o hover desabilitado */}
                <Link href={menu.path} className="flex items-center text-lg hover:text-purple-400 transition-colors">
                    <span className="material-symbols-outlined mr-3 text-xl">{menu.icon}</span>
                    <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{menu.name}</span>
                </Link>
            </div>
        )
    }

    return (
        <div className="relative flex pt-5">
            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white text-slate-950 p-4 shadow-lg transition-width duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <div className="flex items-center mb-2 pl-2">
                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center text-slate-950 hover:text-purple-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">dashboard</span>
                        <h2 className={`pr-1 text-2xl font-bold text-slate-950 ml-4 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                            Dashboard
                        </h2>
                    </button>
                </div>
                {/* Linha abaixo do título Dashboard */}
                <hr className="border-t border-gray-300 mb-4" />

                <nav>
                    <ul className='pl-2'>
                        {
                            menuList.map((menu, index) => {
                                return renderItemMenu(menu, index)
                            })
                        }
                    </ul>
                </nav>
            </aside>
        </div>
    );
}

export default Dashboard;
