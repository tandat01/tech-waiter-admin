import { Customer } from './customer';
import { ContactMessageStatus } from './enums/contact-message-status';

export interface ContactMessage {
    id: number;
    subject: string;
    customer_id: number;
    customer?: Customer;
    email?: string|null;
    message: string;
    read: boolean;
    notified: boolean;
    status: ContactMessageStatus;
    created_at: string;
    updated_at: string;
}
