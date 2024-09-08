export default class CallAPIService{
    async genericRequest(url: string, method: "GET" | "POST" | "PUT" | "DELETE" , withAuth: boolean){
        const header: any = {
            'Content-Type': 'application/json',
        }

        if(withAuth){
            const token = localStorage.getItem("token");
            
            if(!token){
                return;
            }

            header["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: method,
            headers: header
        });

        if(response.status === 401){
            //TODO implementar o Redirect;
        }

        return await response.json();
    }
}