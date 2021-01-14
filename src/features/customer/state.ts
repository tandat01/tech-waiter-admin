import {CommonStatus, StateStatus} from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {PaginationMeta} from '../../common/models/pagination-meta';
import {Customer} from '../../models/customer';

export class CustomerFormData {
    name?: string = undefined;
    status?: CommonStatus = undefined;
}

export class CustomerParams {
    page = 1;
    limit = 40;
    search?: string = undefined;
    status: CommonStatus = CommonStatus.ACTIVE;
}

export class CustomerState {
    formData = new CustomerFormData();
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';

    ids: number[] = [];
    entities: Dictionary<Customer> = {};
    params: CustomerParams = new CustomerParams();
    meta?: PaginationMeta = undefined;
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';

    interactingIds: number[] = [];
}
