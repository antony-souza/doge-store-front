"use client";

import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import withAuth from "@/app/util/withToken";
import FormEditPerfil from "./form-edit-profile";

function PageProfile() {

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <TitlePage name={'Perfil - Editando'} />
                    <FormEditPerfil />
                </LayoutPage>
            </LayoutDashboard>
        </>
    )
}

export default withAuth(PageProfile);