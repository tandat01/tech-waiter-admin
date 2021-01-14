import {CommonStatus} from '../common/enums';
import {Category} from './category';
import {Tag} from './tag';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    details: string;
    images: string[];
    state: string;
    warranty?: number;
    price?: number;
    category_id: number;
    created_by_id: number;
    updated_by_id: number;
    created_at: string;
    updated_at: string;
    status: CommonStatus;
    image_urls: string[];

    category?: Category;
    tags?: Tag[];
}
