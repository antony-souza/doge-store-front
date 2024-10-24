"use client";
import withAuth from "@/app/util/withToken";
import Dashboard from "../components/dashbourd";
import HeaderClient from "../components/header";

function RenderHomePage() {
    return (
        <>
            <HeaderClient />
            <Dashboard/>
        </>
    )
}

export default withAuth(RenderHomePage);
