import { StateStatus } from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {PaginationMeta} from '../../common/models/pagination-meta';
import {Tag} from '../../models/tag';

export class TagParams {
    search?: string = undefined;
}

export class TagState {
    ids: number[] = [];
    entities: Dictionary<Tag> = {};
    params: TagParams = new TagParams();
    meta?: PaginationMeta = undefined;
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';
}
