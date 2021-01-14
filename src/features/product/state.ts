import {CommonStatus, StateStatus} from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {PaginationMeta} from '../../common/models/pagination-meta';
import {Product} from '../../models/product';

export class ProductFormData {
    name?: string = undefined;
    description?: string = undefined;
    images: string[] = [];
    price?: number = undefined;
    category_id?: number = undefined;
    tags?: string[] = undefined;
    status?: CommonStatus = undefined;
    quantity?: number = undefined;
}

export class ProductParams {
    page = 1;
    limit = 40;
    search?: string = undefined;
    status: CommonStatus = CommonStatus.ACTIVE;
    category?: number = undefined;
}

export class ProductState {
    formData = new ProductFormData();
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';

    ids: number[] = [];
    entities: Dictionary<Product> = {};
    params: ProductParams = new ProductParams();
    meta?: PaginationMeta = undefined;
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';

    interactingIds: number[] = [];
}
