import CallAPIService from "@/app/util/call-api.service";
import { jwtDecode } from "jwt-decode";

export interface IAuth {
    email: string;
    password: string;
}

export interface DecodedToken {
    id: string;
    role: string;
    store_id: string;
}


export default class UserService {
    private readonly API_URL = "http://localhost:4200";

    async Auth(email: string, password: string): Promise<IAuth> {
        const url = `${this.API_URL}/auth/login`;
        const body = {
            email,
            password,
        }
        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(url, "POST", false, body);

        if (!response.token) {
            throw new Error('Token não recebido meu nobre!');

        }

        localStorage.setItem('token', response.token);
        
        return response
    }

    async getStore(){
        const token = localStorage.getItem('token');

        if(!token){
            throw new Error('Token não encontrado');
        }

        const decodedToken = jwtDecode<DecodedToken>(token);

        const store_id = decodedToken.store_id;

        const url = `${this.API_URL}/store/store-client/${store_id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(url, "GET", true);

        return response;
    }
}