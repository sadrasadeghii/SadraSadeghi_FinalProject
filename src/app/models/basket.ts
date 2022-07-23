export interface basketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface basket {
    id: number;
    buyerId: string;
    items: basketItem[];
}