import {OrderDetail} from './order-detail';
import {Customer} from './customer';

export interface ContactMessage {
    id: number;
    total_price: number;
    created_by_id: number;
    updated_by_id: number;
    customer_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    order_details: OrderDetail[];
    customer?: Customer;
}
