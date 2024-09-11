export default class CallAPIService {
    async genericRequest(url: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: any, withAuth: boolean = false) {
        const header: any = {
            'Content-Type': 'application/json',
        }

        if (withAuth) {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            header["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: method,
            headers: header,
            body: JSON.stringify(body)
        });

        if (response.status === 401) {
            //TODO implementar o Redirect;
    
            
        }

        return await response.json();
    }
}