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
}