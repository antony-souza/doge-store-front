import CallAPIService from "@/app/util/call-api.service";
import { IStore, IUpdateStore } from "@/app/util/interfaces-global.service";
import { jwtDecode } from "jwt-decode";

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
}

export interface IProduct {
    id: string,
    name: string,
    price: number,
    description: string,
    category: ICategory,
    image_url: string,
}

export interface DecodedToken {
    id: string;
    role: string;
    store_id: string;
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
        localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, JSON.stringify(response.user));

        return response;
    }

    async getStore(): Promise<IStore> {
        const storedStore = localStorage.getItem('store');
        const storedTimestamp = localStorage.getItem('store_timestamp');
        const currentTime = new Date().getTime();
        const expirationTime = 5 * 60 * 1000; // Expiração de 5 minutos (em milissegundos)
    
        // Verifica se os dados da loja no localStorage ainda são válidos
        if (storedStore && storedTimestamp && (currentTime - parseInt(storedTimestamp)) < expirationTime) {
            console.log('Loja carregada do localStorage');
            return JSON.parse(storedStore);
        }
    
        // Caso os dados tenham expirado ou não estejam armazenados, faz uma nova requisição
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
    
        const decodedToken = jwtDecode<DecodedToken>(token);
        const store_id = decodedToken.store_id;
        localStorage.setItem('store_id', store_id);
    
        const endpoint = `/store/store-client/${store_id}`;
        console.log(`Chamada para a URL: ${endpoint}`);
    
        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IStore;
    
        // Armazena os dados da loja e o timestamp no localStorage
        localStorage.setItem('store', JSON.stringify(response));
        localStorage.setItem('store_timestamp', currentTime.toString());
    
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

    async updateStore(body: FormData) {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado');
        }

        const decodedToken = jwtDecode<DecodedToken>(token);
        const store_id = decodedToken.store_id;

        const endpoint = `/store/update/${store_id}`;
        console.log(`Chamada para a URL: ${endpoint}`);

        const callAPIService = new CallAPIService();

        const response = await callAPIService.genericRequest(endpoint, "PUT", true, body) as IUpdateStore[];

        return response;
    }

    async getAllProducts(): Promise<IProduct[]> {
      
        const storedProducts = localStorage.getItem('products');
    
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('Token não encontrado');
        }
    
        const decodedToken = jwtDecode<DecodedToken>(token);
        const store_id = decodedToken.store_id;
    
        const endpoint = `/product/search/${store_id}`;
        console.log(`Chamada para a URL: ${endpoint}`);
    
        const callAPIService = new CallAPIService();
        const response = await callAPIService.genericRequest(endpoint, "GET", true) as IProduct[];
    
        localStorage.setItem('products', JSON.stringify(response));
    
        return response;
    }
    
   
}
