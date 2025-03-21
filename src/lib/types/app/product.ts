import type { Review } from ".";

export type BaseProductLite = {
    name: string;
    image: string;
    condition?: ProductCondition;
    price: number;
}

export interface BaseProduct {
    id: string;
    name: string;
    category: string;
    images: Array<string>;
    videos?: Array<string>;
    description: string;
    condition?: ProductCondition;
    location?: string;
    price: number;
    reviews: Array<Review>;
    orderId: string;
    createdAt: Date;
    lastUpdated: Date;
};

export type ProductGroup = {
    name: string,
    description: string,
    products: Array<BaseProduct>
};

type ProductCondition = {
    name: string;
    inspected: boolean;
    description: string;
};

export interface ProductReference {
    url: string;
    description: string;
};