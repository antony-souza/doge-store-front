import React from "react";
import { LayoutDashboard } from "../../components/layout-dashboard";
import { LayoutPage } from "../../components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";

export default function ProductPage(){
    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <>
                           <TitlePage name="Produtos"/>
                        </>

                        <>
                            <Button>
                                + Produto
                            </Button>
                        </>
                    </div>
                </LayoutPage>
            </LayoutDashboard>
        </>
    )
}