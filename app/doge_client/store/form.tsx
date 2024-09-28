"use client"

import { useEffect, useState } from "react";
import UserService from "../services/user.service";

const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const [file, setFile] = useState<File>();
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('file', file);
        const userService = new UserService();
        await userService.updateStore(formData);
    } catch (error) {
        console.error(error);
    }

    return (
        <>
            <form onSubmit={OnSubmit}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}