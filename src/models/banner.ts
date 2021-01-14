import {CommonStatus} from '../common/enums';
import {User} from './user';

export interface Banner {
    id: number;
    title: string;
    navigate_to: string;
    image: string;
    image_url: string;
    sort_number: number;
    created_at: string;
    updated_at: string;
    created_by_id: number;
    updated_by_id: number;
    status: CommonStatus;
    created_by?: User;
    updated_by?: User;
}
