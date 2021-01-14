import {CommonStatus} from '../common/enums';
import {User} from './user';
import {Category} from './category';
import {Tag} from './tag';

export interface Article {
    id: number;
    name: string;
    slug: string;
    description: string;
    content: string;
    thumbnail: string;
    thumbnail_url: string;
    category_id: number;
    created_by_id: number;
    updated_by_id: number;
    views: number;
    created_at: string;
    updated_at: string;
    status: CommonStatus;
    created_by?: User;
    updated_by?: User;
    category?: Category;
    tags?: Tag[];
}
