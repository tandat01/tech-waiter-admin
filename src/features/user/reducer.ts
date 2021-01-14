import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserFormData, UserParams, UserState} from './state';
import {filterParams, PreparedCaseReducer, transform} from '../../common/utils';
import {FilterTransformStrategy} from '../../common/utils/filter-params';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';
import {User} from '../../models/user';
import {Rest} from '../../common/models/rest';

const slice = createSlice({
    name: 'user',
    initialState: {...new UserState()},
    reducers: {
        submitUserForm: (state, {payload}: PayloadAction<UserFormData>) => {
            state.formStatus = 'loading';
        },

        userFormSubmitted: (state, {payload}: PayloadAction<boolean>) => {
            state.formStatus = 'idle';
        },

        singleUserAdded: new PreparedCaseReducer<UserState, User, boolean>(
            (state, {payload, meta: willUpdateForm}) => {
                state.entities[payload.id] = {
                    ...state.entities[payload.id] || {},
                    ...filterParams(payload, FilterTransformStrategy.NON_TRANSFORM)
                };
                if (!state.ids.includes(payload.id)) {
                    state.ids.push(payload.id);
                }

                if (willUpdateForm) {
                    state.formId = payload.id;
                    state.formData = transform(new UserFormData(), payload);
                }
            }
        ),

        userParamsChange: new PreparedCaseReducer<UserState, Partial<UserParams> | undefined, boolean>(
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

        listUsersLoaded(state: UserState, {payload}: PayloadAction<Rest<User>>) {
            state.ids = payload.datas.map(user => user.id);
            state.entities = keyBy(payload.datas, 'id');
            state.listLoaded = true;
            state.meta = payload.meta;
            state.listStatus = 'idle';
        },

        userFormChanged: new PreparedCaseReducer<UserState, UserFormData, number | null>(
            (state: UserState, {payload, meta}) => {
                state.formData = payload;
                state.formId = typeof meta === 'undefined' ? state.formId : meta as any;
            }
        ),

        deleteUser: (state, {payload}: PayloadAction<number>) => {
            if (!state.interactingIds.includes(payload)) {
                state.interactingIds.push(payload);
            }
        },

        userDeleted: (state: UserState, {payload}: PayloadAction<number>) => {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        userDeleteFailed: (state: UserState, {payload}: PayloadAction<number>) => {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    }
});

export const {
    userFormChanged,
    userDeleteFailed,
    userDeleted,
    deleteUser,
    listUsersLoaded,
    singleUserAdded,
    userParamsChange,
    submitUserForm,
    userFormSubmitted
} = slice.actions;

export const userFormIdChange = createAction<number>('user/formIdChange');
export const loadSingleUser = createAction<number>('user/loadSingle');

const userReducer = slice.reducer;

export default userReducer;
