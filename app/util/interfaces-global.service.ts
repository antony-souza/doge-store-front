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
    background_image?: string;
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
    background_image?: File;
    background_color?: string;
}