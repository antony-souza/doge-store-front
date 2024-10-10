"use client";

import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { FormUpdateProfile } from "./form-edit-profile";

export default function PageProfile() {

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <TitlePage name="Perfil" />
                    <FormUpdateProfile />
                </LayoutPage>
            </LayoutDashboard>
        </>
    )
}