import CallAPIService from "@/app/util/call-api.service";
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";
import { jwtDecode } from "jwt-decode";

export interface IQrCode {
    text: string,
    size: string
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthResponse {
    token: string,
    message: string,
    user: IUserLocalStorage
}

export interface IUserLocalStorage {
    id: string,
    name: string,
    imageUrl: string
}

export interface ICategory {
    id: string,
    name: string,
    image_url: string,
    store: IStore
    product: IProduct[]
}

export interface IProduct {
    id: string,
    name: string,
    price: number,
    description: string,
    category: ICategory,
    store_id: string,
    category_id: string,
    image_url: string,
    cart: boolean,
    featured_products: boolean,
    store: IStore
}

export interface IFeaturedProducts {
    id: string,
    name: string,
    price: number,
    description: string,
    category: ICategory,
    store_id: string,
    category_id: string,
    image_url: string,
    store: IStore
}

export interface IUpdateProduct {
    id?: string,
    name?: string,
    price?: number,
    description?: string,
    category?: ICategory,
    image_url?: string,
    featured_products?: boolean,
}

export interface DecodedToken {
    id: string;
    role: string;
    store_id: string;
    product: IUpdateProduct;
}

export default class UserService extends CallAPIService {
    private readonly USER_LOCAL_STORAGE_KEY = "user";

    async auth(email: string, password: string): Promise<IAuthResponse> {
        const endpoint = '/auth/login';
        const body = { email, password };
        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "POST", false, body) as IAuthResponse;

        if (!response.token) {
            throw new Error('Token não recebido meu nobre!');
        }
        const decodedToken = jwtDecode<DecodedToken>(response.token);

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('store_id', decodedToken.store_id)
        localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, JSON.stringify(response.user));

        return response;
    }

    async getStore(id:string): Promise<IStore> {

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/store/store-client/${id}`;

        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true);

        return response;
    }

    getUserStorage(): IUserLocalStorage | undefined {
        const userStorage = localStorage.getItem(this.USER_LOCAL_STORAGE_KEY);

        if (!userStorage) {
            return undefined;
        }

        return JSON.parse(userStorage);
    }

    removeUserStorage() {
        localStorage.clear();
    }

    async updateUser(body: FormData, id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/user/update/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body)

        return response;
    }

    async updateStore(id: string, body: FormData) {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/store/update/${id}`;
        console.log(`Chamada para a URL: ${endpoint}`);


        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body) as IUpdateStore;

        return response;
    }

    async getAllProducts(id: string): Promise<IProduct[]> {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/product/search/${id}`;


        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IProduct[];


        return response;
    }

    async createProduct(body: FormData, id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/product/create/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "POST", true, body) as IProduct[];

        return response;
    }

    async updateProduct(id: string, body: FormData) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }
        const endpoint = `/product/update/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body) as IUpdateProduct[];

        return response;
    }

    async deleteProduct(id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/product/delete/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "DELETE", true)

        return response;
    }

    async getAllFeaturedProducts(id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/product/featured/${id}`;

        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IProduct[];

        return response;
    }

    async getAllCategories(id: string) {
        const token = localStorage.getItem('token');
  
        if (!token) {
            throw new Error('Token não encontrado');
        }


        const endpoint = `/category/search/${id}`;

        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true) as ICategory[];

        /*         localStorage.setItem('category', JSON.stringify(response));
                localStorage.setItem('categoryTimestamp', currentTime.toString()); */

        return response;
    }

    async createCategory(body: FormData) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/category/create`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "POST", true, body) as ICategory[];

        return response;
    }

    async updateCategory(body: FormData, id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/category/update/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body) as ICategory[];

        return response;
    }

    async deleteCategory(id: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const endpoint = `/category/delete/${id}`;

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "DELETE", true) as ICategory[];

        return response;
    }

    async generateQrCode(text: string, size: string) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const encodedText = encodeURIComponent(text);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_QR_CODE}?data=${encodedText}&size=${size}`, {
            method: 'GET',
        });

        return response.url;
    }

}
