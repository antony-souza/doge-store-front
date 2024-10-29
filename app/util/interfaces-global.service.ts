import { IUsers } from "../doge_client/services/admin.service";
import { ICategory, IProduct, IUserLocalStorage } from "../doge_client/services/user.service";

export interface IStore {
    id: string;
    name: string;
    phone: string;
    address: string;
    image_url: string;
    is_open: boolean;
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
    is_open?: boolean;
    address?: string;
    image_url?: File;
    description?: string;
    banner_url?: File;
    background_color?: string;
}