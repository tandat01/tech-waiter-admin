import {Product} from './product';

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    unit_price: number;
    quantity: number;
    note?: string;
    created_by_id: number;
    updated_by_id: number;
    created_at: string;
    updated_at: string;
    status: number; // Order
    product: Product;
}
