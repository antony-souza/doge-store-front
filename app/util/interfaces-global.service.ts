export interface IStore {
    id: string;
    name: string;
    phone: string;
    address: string;
    image_url: string;
    is_open: boolean;
    description: string;
    background_color: string;
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