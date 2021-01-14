import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductFormData, ProductParams, ProductState} from './state';
import {filterParams, PreparedCaseReducer, transform} from '../../common/utils';
import {FilterTransformStrategy} from '../../common/utils/filter-params';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';
import {Product} from '../../models/product';
import {Rest} from '../../common/models/rest';

const slice = createSlice({
    name: 'product',
    initialState: {...new ProductState()},
    reducers: {
        submitProductForm: (state, {payload}: PayloadAction<ProductFormData>) => {
            state.formStatus = 'loading';
        },

        productFormSubmitted: (state, {payload}: PayloadAction<boolean>) => {
            state.formStatus = 'idle';
        },

        singleProductAdded: new PreparedCaseReducer<ProductState, Product, boolean>(
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
                    const formData: ProductFormData = transform(new ProductFormData(), payload);
                    formData.tags = payload.tags?.map(tag => tag.name);
                    state.formData = formData;
                }
            }
        ),

        productParamsChange: new PreparedCaseReducer<ProductState, Partial<ProductParams> | undefined, boolean>(
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

        listProductsLoaded(state: ProductState, {payload}: PayloadAction<Rest<Product>>) {
            state.ids = payload.datas.map(product => product.id);
            state.entities = keyBy(payload.datas, 'id');
            state.listLoaded = true;
            state.meta = payload.meta;
            state.listStatus = 'idle';
        },

        productFormChanged: new PreparedCaseReducer<ProductState, ProductFormData, number | null>(
            (state: ProductState, {payload, meta}) => {
                state.formData = payload;
                state.formId = typeof meta === 'undefined' ? state.formId : meta as any;
            }
        ),

        deleteProduct: (state, {payload}: PayloadAction<number>) => {
            if (!state.interactingIds.includes(payload)) {
                state.interactingIds.push(payload);
            }
        },

        productDeleted: (state: ProductState, {payload}: PayloadAction<number>) => {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        productDeleteFailed: (state: ProductState, {payload}: PayloadAction<number>) => {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    }
});

export const {
    productFormChanged,
    productDeleteFailed,
    productDeleted,
    deleteProduct,
    listProductsLoaded,
    singleProductAdded,
    productParamsChange,
    submitProductForm,
    productFormSubmitted
} = slice.actions;

export const productFormIdChange = createAction<string>('product/formIdChange');
export const loadSingleProduct = createAction<string>('product/loadSingle');

const productReducer = slice.reducer;

export default productReducer;
