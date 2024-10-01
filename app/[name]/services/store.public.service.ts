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
    private readonly API_URL = "https://antony-souza.online";

    async getPublicStore(name: string) {

        const encodedName = encodeURIComponent(name);
        const url = `${this.API_URL}/public/search_store/?name=${encodedName}`;

        const callAPIService = new CallAPIService();
        
        const response = await callAPIService.genericRequest(url, "GET", false);

        return response;
    }
}