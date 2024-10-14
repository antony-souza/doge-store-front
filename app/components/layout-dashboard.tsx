import React, { ReactNode } from "react";
import HeaderClient from "../doge_client/components/header";
import Dashboard from "../doge_client/components/dashbourd";

interface ILayoutDashboardProps{
    children: ReactNode,
    dashboardConfig?: {
        isSidebarOpenProps: boolean
    }
}

export const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children, dashboardConfig }) => {
    return (
        <>
            <HeaderClient />
            <Dashboard isSidebarOpenProps={dashboardConfig ? dashboardConfig.isSidebarOpenProps : undefined}/>
            {children}
        </>
    )
}