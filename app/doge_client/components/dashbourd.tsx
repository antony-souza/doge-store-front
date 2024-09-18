'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex pt-5">
            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white text-slate-950 p-4 shadow-lg transition-width duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <div className="flex items-center mb-6 pl-2">
                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center text-slate-950 hover:text-purple-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">dashboard</span>
                        <h2 className={`text-2xl font-bold text-slate-950 ml-4 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                            Dashboard
                        </h2>
                    </button>
                </div>

                {/* Linha abaixo do título Dashboard */}
                <hr className="border-t border-gray-300 mb-4" />

                <nav>
                    <ul className='pl-2'>
                        <li className="mb-4">
                            <Link href="/doge_client/home/store" className="flex items-center text-lg hover:text-purple-400 transition-colors">
                                <span className="material-symbols-outlined mr-3 text-xl">store</span>
                                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Loja</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center text-lg hover:text-purple-400 transition-colors">
                                <span className="material-symbols-outlined mr-3 text-xl">category</span>
                                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Categorias</span>
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center text-lg hover:text-purple-400 transition-colors">
                                <span className="material-symbols-outlined mr-3 text-xl">inventory</span>
                                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Produtos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-lg hover:text-purple-400 transition-colors">
                                <span className="material-symbols-outlined mr-3 text-xl">star</span>
                                <span className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Destaques</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}

export default Dashboard;
