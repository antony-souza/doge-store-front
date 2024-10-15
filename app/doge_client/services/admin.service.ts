import CallAPIService from "@/app/util/call-api.service";
import { IUpdateStore } from "@/app/util/interfaces-global.service";


export interface IUsers {
    id: string;
    name: string;
    email: string;
    store: IUpdateStore;
    image_url: string;
    role: string;
}

export default class AdminService extends CallAPIService {
    async getAllUsers(){

        const token = localStorage.getItem("token");

        if(!token){
            throw new Error("Token não encontrado");
        }

        const callAPIService = new CallAPIService();
        const endpoint = "/user/all";

        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IUsers[];

        return response;
    }

    async createUser(body: FormData){
        const token = localStorage.getItem("token");

        if(!token){
            throw new Error("Token não encontrado");
        }

        const callAPIService = new CallAPIService();
        const endpoint = "/user/create";

        const response = await callAPIService.genericRequest(endpoint, "POST", true, body);

        return response;
    }

    async updateUser(body: FormData){
        const token = localStorage.getItem("token");

        if(!token){
            throw new Error("Token não encontrado");
        }

        const callAPIService = new CallAPIService();
        const endpoint = "/user/update";

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body);

        return response;
    }

    async deleteUser(id: string){
        const token = localStorage.getItem("token");

        if(!token){
            throw new Error("Token não encontrado");
        }

        const callAPIService = new CallAPIService();
        const endpoint = `/user/delete/${id}`;

        const response = await callAPIService.genericRequest(endpoint, "DELETE", true);

        return response;
    }

    async getAllStoreName(){
        const token = localStorage.getItem("token");

        if(!token){
            throw new Error("Token não encontrado");
        }

        const callAPIService = new CallAPIService();
        const endpoint = "/store/all";

        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IUpdateStore[];

        return response;
    }
}