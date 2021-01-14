import {CommonStatus, StateStatus} from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {Banner} from '../../models/banner';

export class BannerFormData {
    title?: string = undefined;
    navigate_to?: string = undefined;
    image?: string = undefined;
    sort_number: string[] = [];
    status?: CommonStatus = undefined;
}

export class BannerState {
    formData = new BannerFormData();
    formId?: number = undefined;
    formStatus: StateStatus = 'idle';

    ids: number[] = [];
    entities: Dictionary<Banner> = {};
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';

    interactingIds: number[] = [];
}
