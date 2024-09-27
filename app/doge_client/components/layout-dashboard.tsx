import React, { ReactNode } from "react";
import HeaderClient from "./header";
import Dashboard from "./dashbourd";

interface ILayoutDashboardProps{
    children: ReactNode,
    dashboardConfig?: {
        isSidebarOpenProps: boolean
    }
}

const LayoutDashboard: React.FC<ILayoutDashboardProps> = ({ children, dashboardConfig }) => {
    return (
        <>
            <HeaderClient />
            <Dashboard isSidebarOpenProps={dashboardConfig ? dashboardConfig.isSidebarOpenProps : undefined}/>
            {children}
        </>
    )
}

export default LayoutDashboard;