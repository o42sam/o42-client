import type { BaseProduct, BaseProductLite, ProductReference } from "./product";

export interface BaseOrder {
    id: string;
    name: string;
    type?: SaleOrder|PurchaseOrder;
    description: string;
    creatorId: string;
    isFulfilled: boolean;
    agentsAssignedIds?: Array<string>;
    commissionOnFulfill?: number;
    createdAt: Date;
    lastUpdated: Date;
}

export interface SaleOrder extends BaseOrder {
    saleType: Auction|Negotiation;
    product: Array<BaseProduct|BaseProductLite>;
}

interface Auction {
    startPrice: number;
    lastSellingPrice: number;
    currentSellingPrice: number;
    priceChangeCount: number;
    bids?: Array<Bid>;
    biddingStartedAt: Date;
    biddingEndingAt: Date;
}

interface Negotiation {
    startPrice?: number;
    finalPrice: number;
}

interface Bid {
    bidderId: string;
    badeAt: Date;
}

export interface PurchaseOrder extends BaseOrder {
    productReference?: ProductReference;
    isProductAvailable: boolean;
}

export type OrderLite = {
    id: string;
    name: string;
    type: string;
    finalPrice?: number;
};