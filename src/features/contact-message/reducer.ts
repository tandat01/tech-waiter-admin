import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ContactMessageParams, ContactMessageState } from './state';
import {filterParams, PreparedCaseReducer} from '../../common/utils';
import {FilterTransformStrategy} from '../../common/utils/filter-params';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';
import {ContactMessage} from '../../models/contact-message';
import {Rest} from '../../common/models/rest';
import {Draft} from 'immer';

const interactWithContactMessage = (state: Draft<ContactMessageState>, payload: number) => {
    if (!state.interactingIds.includes(payload)) {
        state.interactingIds.push(payload);
    }
};

const slice = createSlice({
    name: 'contactMessage',
    initialState: {...new ContactMessageState()},
    reducers: {
        singleContactMessageAdded: new PreparedCaseReducer<ContactMessageState, ContactMessage, boolean>(
            (state, {payload, meta: willUpdateForm}) => {
                state.entities[payload.id] = {
                    ...state.entities[payload.id] || {},
                    ...filterParams(payload, FilterTransformStrategy.NON_TRANSFORM)
                };
                if (!state.ids.includes(payload.id)) {
                    state.ids.push(payload.id);
                }
            }
        ),

        contactMessageParamsChange: new PreparedCaseReducer<ContactMessageState, Partial<ContactMessageParams> | undefined, boolean>(
            (state, {payload}) => {
                const oldParams = state.params;
                const newParams = {
                    ...state.params,
                    ...(payload ?? {})
                };
                if (!state.listLoaded || !isEqual(oldParams, newParams)) {
                    state.params = newParams;
                    state.listStatus = 'loading';
                }
            }
        ),

        listContactMessagesLoaded(state: ContactMessageState, {payload}: PayloadAction<Rest<ContactMessage>>) {
            state.entities = keyBy(payload.datas, 'id');
            state.ids = payload.datas.map(contactMessage => contactMessage.id);
            state.listLoaded = true;
            state.meta = payload.meta;
            state.listStatus = 'idle';
        },

        deleteContactMessage: (state, {payload}: PayloadAction<number>) => {
            interactWithContactMessage(state, payload);
        },

        resolveContactMessage(state, {payload}: PayloadAction<number>) {
            interactWithContactMessage(state, payload);
        },

        readContactMessage(state, {payload}: PayloadAction<number>) {
            interactWithContactMessage(state, payload);
        },

        contactMessageDeleted: (state: ContactMessageState, {payload}: PayloadAction<number>) => {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        endInteractWithContactMessage: (state: ContactMessageState, {payload}: PayloadAction<number>) => {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    }
});

export const {
    endInteractWithContactMessage,
    contactMessageDeleted,
    deleteContactMessage,
    listContactMessagesLoaded,
    singleContactMessageAdded,
    contactMessageParamsChange,
    readContactMessage,
    resolveContactMessage
} = slice.actions;

export const loadSingleContactMessage = createAction<string>('contactMessage/loadSingle');

const contactMessageReducer = slice.reducer;

export default contactMessageReducer;
