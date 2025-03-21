import type { BaseProduct, BaseProductLite, ProductReference } from "./product";

export interface BaseOrder {
    name: string;
    products: Array<BaseProduct|BaseProductLite> | null;
    description: string;
    creatorId: string;
    isFulfilled: boolean;
    agentsAssignedIds: Array<string>;
    createdAt: Date;
    lastUpdated: Date;
    type?: string;
}

export interface SaleOrder extends BaseOrder {
    startPrice?: number;
    finalPrice: number;
}

export interface PurchaseOrder extends BaseOrder {
    reference?: ProductReference;
    isProductAvailable: boolean;
}

export type OrderLite = {
    name: string;
    type: string;
    finalPrice?: number;
};