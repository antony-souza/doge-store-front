import React from "react";
import LayoutDashboard from "../components/layout-dashboard";

export default function ProductPage(){
    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <div>
                </div>
            </LayoutDashboard>
        </>
    )
}