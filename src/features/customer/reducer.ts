import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CustomerFormData, CustomerParams, CustomerState} from './state';
import {filterParams, PreparedCaseReducer, transform} from '../../common/utils';
import {FilterTransformStrategy} from '../../common/utils/filter-params';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';
import {Customer} from '../../models/customer';
import {Rest} from '../../common/models/rest';

const slice = createSlice({
    name: 'customer',
    initialState: {...new CustomerState()},
    reducers: {
        submitCustomerForm: (state, {payload}: PayloadAction<CustomerFormData>) => {
            state.formStatus = 'loading';
        },

        customerFormSubmitted: (state, {payload}: PayloadAction<boolean>) => {
            state.formStatus = 'idle';
        },

        singleCustomerAdded: new PreparedCaseReducer<CustomerState, Customer, boolean>(
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
                    state.formData = transform(new CustomerFormData(), payload);
                }
            }
        ),

        customerParamsChange: new PreparedCaseReducer<CustomerState, Partial<CustomerParams> | undefined, boolean>(
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

        listCustomersLoaded: (state: CustomerState, {payload}: PayloadAction<Rest<Customer>>) => {
            state.entities = keyBy(payload.datas, 'id');
            state.listLoaded = true;
            state.ids = payload.datas.map(customer => customer.id);
            state.meta = payload.meta;
            state.listStatus = 'idle';
        },

        customerFormChanged: new PreparedCaseReducer<CustomerState, CustomerFormData, number | null>(
            (state: CustomerState, {payload, meta}) => {
                state.formData = payload;
                state.formId = typeof meta === 'undefined' ? state.formId : meta as any;
            }
        ),

        deleteCustomer: (state, {payload}: PayloadAction<number>) => {
            if (!state.interactingIds.includes(payload)) {
                state.interactingIds.push(payload);
            }
        },

        customerDeleted: (state: CustomerState, {payload}: PayloadAction<number>) => {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        customerDeleteFailed: (state: CustomerState, {payload}: PayloadAction<number>) => {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    }
});

export const {
    customerFormChanged,
    customerDeleteFailed,
    customerDeleted,
    deleteCustomer,
    listCustomersLoaded,
    singleCustomerAdded,
    customerParamsChange,
    submitCustomerForm,
    customerFormSubmitted
} = slice.actions;

export const customerFormIdChange = createAction<number>('customer/formIdChange');
export const loadSingleCustomer = createAction<number>('customer/loadSingle');

const customerReducer = slice.reducer;

export default customerReducer;
