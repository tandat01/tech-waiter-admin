import {StateStatus} from '../../common/enums';
import {Dictionary} from '@reduxjs/toolkit';
import {ContactMessage} from '../../models/contact-message';
import {ContactMessageStatus} from '../../models/enums/contact-message-status';
import {PaginationMeta} from '../../common/models/pagination-meta';

export class ContactMessageParams {
    page: number = 1;
    limit: number = 20;
    status: ContactMessageStatus = ContactMessageStatus.WAITING;
    search?: string = undefined;
    read?: boolean = undefined;
}

export class ContactMessageState {
    ids: number[] = [];
    params = new ContactMessageParams();
    entities: Dictionary<ContactMessage> = {};
    listLoaded: boolean = false;
    listStatus: StateStatus = 'idle';

    interactingIds: number[] = [];
    meta?: PaginationMeta = undefined;
}
