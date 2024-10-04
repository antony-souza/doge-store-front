import CallAPIService from "@/app/util/call-api.service";

export interface IParams {
    name: string;
}

export interface ICategory {
    id: number;
    name: string;
    image_url: string;
}


export default class PublicStoreService {
    async getPublicStore(name: string) {

        const encodedName = encodeURIComponent(name);
        const endpoint = `/public/search_store/?name=${encodedName}`;

        const callAPIService = new CallAPIService();
        
        const response = await callAPIService.genericRequest(endpoint, "GET", false);

        return response;
    }
}