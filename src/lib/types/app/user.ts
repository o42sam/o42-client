import type { Review } from ".";
import type { BaseOrder, PurchaseOrder, SaleOrder } from "./order";
import type { Message } from ".";

export interface BaseUser {
    username: string;
    email: string;
    password: string;
};

export interface Customer extends BaseUser {
    id: string;
    fName: string;
    lName: string;
    gender: string;
    profilePhoto?: string;
    location?: string;
    isEmailVerified: boolean;
    messages?: Array<Message>;
}

export interface Agent extends Customer {
    profilePhoto: string;
    dob: Date;
    phoneNumber: string;
    face: FaceMapping;
    location: string;
    about: string;
    isPhoneNumberVerified: boolean;
    isPersonalIdVerified: boolean;
    orders: Array<BaseOrder|SaleOrder|PurchaseOrder>;
    tier: AgentTier;
    reviews: Array<Review>;
    createdAt: Date;
    lastUpdated: Date;
}

interface FaceMapping {

}

interface AgentTier {
    name: string;
    description: string;
}

export interface CustomerLite {
    id: string;
    username: string;
}

export interface AgentLite {
    id: string;
    username: string;
    profilePhoto: string;
}