import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagParams, TagState } from './state';
import { PreparedCaseReducer } from '../../common/utils';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';
import {Tag} from '../../models/tag';
import {Rest} from '../../common/models/rest';
import {Product} from '../../models/product';
import { singleProductAdded, listProductsLoaded } from '../product/reducer';

const addTagFromProduct = (state: TagState, product: Product) => {
    if (product.tags?.length) {
        product.tags.forEach(tag => {
            if (!state.ids.includes(tag.id)) {
                state.ids.push(tag.id);
                state.entities[tag.id] = tag;
            }
        })
    }
};

const slice = createSlice({
    name: 'tag',
    initialState: {...new TagState()},
    reducers: {
        tagParamsChange: new PreparedCaseReducer<TagState, Partial<TagParams> | undefined, boolean>(
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

        listTagsLoaded(state: TagState, {payload}: PayloadAction<Rest<Tag>>) {
            state.ids = payload.datas.map(tag => tag.id);
            state.entities = keyBy(payload.datas, 'id');
            state.listLoaded = true;
            state.meta = payload.meta;
            state.listStatus = 'idle';
        },
    },

    extraReducers: {
        [singleProductAdded.type]: (state, {payload}: PayloadAction<Product>) => {
            addTagFromProduct(state, payload);
        },
        [listProductsLoaded.type]: (state, {payload}: PayloadAction<Rest<Product>>) => {
            payload.datas.forEach(product => addTagFromProduct(state, product));
        }
    }
});

export const {
    listTagsLoaded,
    tagParamsChange,
} = slice.actions;

const tagReducer = slice.reducer;

export default tagReducer;
