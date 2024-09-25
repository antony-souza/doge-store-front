import CallAPIService from "@/app/util/call-api.service";

export interface IParams {
    name: string;
}

export interface ICategory {
    id: number;
    name: string;
    image_url: string;
}

export interface IProduct {
    id: number;
    name: string;
    image_url: string;
    price: string;
}

export interface IStore {
    id: string;
    name: string;
    phone: string;
    address: string;
    is_open: boolean;
    image_url: string;
    description: string;
    background_color: string;
    categories: ICategory[];
    featuredProducts: IProduct[];
}


export default class PublicStoreService {
    private readonly API_URL = "http://localhost:4200";

    async getPublicStore(name: string) {

        const encodedName = encodeURIComponent(name);
        const url = `${this.API_URL}/public/search_store/?name=${encodedName}`;

        const callAPIService = new CallAPIService();
        
        const response = await callAPIService.genericRequest(url, "GET", false);

        return response;
    }
}