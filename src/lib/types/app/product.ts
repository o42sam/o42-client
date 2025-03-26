import type { Review } from ".";
import type { Amount } from "./wallet";

export type BaseProductLite = {
    name: string;
    image: string;
    condition?: ProductCondition;
    price: Amount;
}

export interface BaseProduct {
    id: string;
    name: string;
    category: string;
    description: string;
    fault?: Fault;
    images: Array<File>;
    video: string;
    condition?: ProductCondition;
    location?: string;
    price: Amount;
    reviews: Array<Review>;
    saleOrderId: string;
    createdAt: Date;
    lastUpdated: Date;
};

interface Fault {
    description: string;
}

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