"use client";

import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { FormUpdateProfile } from "./form-edit-profile";
import { useState } from "react";
import withAuth from "@/app/util/withToken";

function PageProfile() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
                <LayoutPage>
                    <TitlePage name={'Perfil - Editando'} />
                    <FormUpdateProfile />
                </LayoutPage>
            </LayoutDashboard>
        </>
    )
}

export default withAuth(PageProfile);