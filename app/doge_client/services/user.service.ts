import CallAPIService from "@/app/util/call-api.service";

export interface IAuth {
    email: string;
    password: string;
}


export default class UserService {
    private readonly API_URL = "http://localhost:4200";
    private readonly API_ROUTER = "auth";

    async Auth(email: string, password: string): Promise<IAuth> {
        const url = `${this.API_URL}/${this.API_ROUTER}/login`;

        const body = {
            email,
            password
        }

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(url, "POST", body, false);

        if (!response.token) {
            throw new Error('Token não recebido meu nobre!');

        }

        localStorage.setItem('token', response.token);
        
        return response
    }
}