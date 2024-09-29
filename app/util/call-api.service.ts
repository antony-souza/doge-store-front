import { useRouter } from "next/navigation";

export default class CallAPIService {
    private readonly router = useRouter();
    async genericRequest(url: string, method: "GET" | "POST" | "PUT" | "DELETE", withAuth: boolean, body?: any) {
        const headers: any = {
            'Content-Type': 'application/json',
        };

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
            // Só adiciona o body se for diferente de GET e o body existir
            ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
        };

        const response = await fetch(url, requestConfig);

        if (response.status === 401) {

        }

        return await response.json();
    }
}
