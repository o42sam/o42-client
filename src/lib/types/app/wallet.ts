export interface Wallet {
    id: string;
    ownerId: string;
    account: Account;
}

export interface Amount {
    value: number;
    currency: Currency;
}

interface Currency {
    name: string;
    symbol: string;
    shorthand: string;
}

interface Account {
    name: string;
    number: string;
    bank: string;
    balance: Amount;
}