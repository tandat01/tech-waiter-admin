import {CommonStatus} from '../common/enums';
import {User} from './user';

export interface Customer {
    id: number;
    name: string;
    status: CommonStatus;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
}
