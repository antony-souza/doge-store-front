import { IUsers } from "../doge_client/services/admin.service";
import { ICategory, IProduct, IUserLocalStorage } from "../doge_client/services/user.service";

export interface IStore {
    id: string;
    name: string;
    phone: string;
    address: string;
    image_url: string;
    open_time: string;
    close_time: string;
    description: string;
    background_color: string;
    banner_url?: string;
    category: ICategory[];
    product: IProduct[];
}

export interface IUpdateStore {
    id?: number;
    name?: string;
    phone?: string;
    address?: string;
    image_url?: File | null;
    description?: string;
    banner_url?: File | null;
    open_time?: string;
    close_time?: string;
    background_color?: string;
}