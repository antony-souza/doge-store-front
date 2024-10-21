import { ICategory, IProduct } from "../doge_client/services/user.service";

export interface IStore {
    id: string;
    name: string;
    phone: string;
    address: string;
    image_url: string;
    is_open: boolean;
    description: string;
    background_color: string;
    category: ICategory[];
    product: IProduct[];
}

export interface IUpdateStore {
    id?: number;
    name?: string;
    phone?: string;
    address?: string;
    image_url?: File;
    is_open?: boolean;
    description?: string;
    background_color?: string;
}