import React, { ReactNode } from "react";

interface ILayoutPageProps{
    children: ReactNode
}

export const LayoutPage: React.FC<ILayoutPageProps> = ({ children }) => {
    return (
        <div className="flex justify-center align-middle mb-10 mt-20">
            <div className="w-4/6 bg-white rounded-md shadow p-5">
                {children}                
            </div>
        </div>
    )
}