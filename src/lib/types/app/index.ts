export interface Review {
    authorId: string;
    rating: number;
    comment?: string;
}

export interface Message {
    id: string;
    senderId: string;
    recipientId: string;
    content: string;
    read: boolean;
    timestamp: Date;
}