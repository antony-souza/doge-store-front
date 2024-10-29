import { IProduct } from "@/app/doge_client/services/user.service";
import CallAPIService from "@/app/util/call-api.service";
import { IStore } from "@/app/util/interfaces-global.service";

export interface IPublicPageProps {
  params: {
    name: string;
  };
}

export default class PublicStoreService {
  async getPublicStore(name: string) {

    const endpoint = `/public/search/?name=${name}`;

    const callAPIService = new CallAPIService();

    const response = await callAPIService.genericRequest(endpoint, "GET", false) as IStore[];

    if(response.length > 0) {
      const storeID = response[0].id;
      sessionStorage.setItem('store_id', storeID);
    }

    return response;
  };
}