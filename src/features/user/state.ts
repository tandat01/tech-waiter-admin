import {CommonStatus, StateStatus} from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {PaginationMeta} from '../../common/models/pagination-meta';
import {User} from '../../models/user';

export class UserFormData {
    name?: string = undefined;
    username?: string = undefined;
    password?: string = undefined;
    email?: string = undefined;
    status?: CommonStatus = undefined;
}

export class UserParams {
    page = 1;
    limit = 40;
    search?: string = undefined;
    status: CommonStatus = CommonStatus.ACTIVE;
}

export class UserState {
    formData = new UserFormData();
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';

    ids: number[] = [];
    entities: Dictionary<User> = {};
    params: UserParams = new UserParams();
    meta?: PaginationMeta = undefined;
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';

    interactingIds: number[] = [];
}
