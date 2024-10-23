import { routes } from "@/router";

type API_URL = "LOCALHOST" | "AWS";

export default class CallAPIService {
    private readonly baseURL: string;

    constructor() {
        const apiUrlType = process.env.API_URL as API_URL || "LOCALHOST";

        this.baseURL = apiUrlType === "AWS"
            ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST as string
            : process.env.NEXT_PUBLIC_API_URL_AWS as string;

        if (!this.baseURL) {
            console.error("Base URL não definida. Verifique as variáveis de ambiente.");
        }
    }

    async genericRequest(endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", withAuth: boolean, body?: any) {
        const url = `${this.baseURL}${endpoint}`;

        const headers: any = {};

        // Define como application/json apenas se o body não for FormData
        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        if (withAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }

        const requestConfig: RequestInit = {
            method: method,
            mode: "cors",
            headers: headers,
            // Não fazer JSON.stringify para FormData
            ...(method !== "GET" && body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
        };

        const response = await fetch(url, requestConfig);

        if (response.status === 401) {
            localStorage.clear();
            window.location.href = routes.LOGIN;
        }

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Erro na requisição');
        }

        return await response.json();
    }
}
