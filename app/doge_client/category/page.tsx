"use client";
import { HiPlusCircle } from "react-icons/hi2";
import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <div className="flex justify-between align-middle">
                        <>
                            <TitlePage name="Produtos" />
                        </>

                        <>
                            <Button>
                                <HiPlusCircle />
                                Produto
                            </Button>
                        </>
                    </div>
                </LayoutPage>
            </LayoutDashboard>
        </>
    )
}