import CallAPIService from "@/app/util/call-api.service";

export interface IListAllClientResponse{
    id: string,
    name: string,
    store_config: [
        {
            description: string,
            image_url: string,
            background_color: string
        }
    ]
}

export default class ClientService{
    private readonly API_URL = "http://localhost:4200";
    private readonly API_ROUTER = "store"

    async listAllClient(): Promise<IListAllClientResponse[]>{
        const url = `${this.API_URL}/${this.API_ROUTER}`

        const callAPIService = new CallAPIService();

        return await callAPIService.genericRequest(url, "GET", true);
    }
}