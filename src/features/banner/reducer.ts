import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BannerFormData, BannerState} from './state';
import {filterParams, PreparedCaseReducer, transform} from '../../common/utils';
import {FilterTransformStrategy} from '../../common/utils/filter-params';
import keyBy from 'lodash/keyBy';
import {Banner} from '../../models/banner';
import {Rest} from '../../common/models/rest';

const slice = createSlice({
    name: 'banner',
    initialState: {...new BannerState()},
    reducers: {
        submitBannerForm: (state, {payload}: PayloadAction<BannerFormData>) => {
            state.formStatus = 'loading';
        },

        bannerFormSubmitted: (state, {payload}: PayloadAction<boolean>) => {
            state.formStatus = 'idle';
        },

        singleBannerAdded: new PreparedCaseReducer<BannerState, Banner, boolean>(
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
                    state.formData = transform(new BannerFormData(), payload);
                }
            }
        ),

        refreshListBanner: (state) => {
            if (!state.listLoaded) {
                state.listStatus = 'loading';
            }
        },

        listBannersLoaded(state: BannerState, {payload}: PayloadAction<Rest<Banner>>) {
            state.ids = payload.datas.map(banner => banner.id);
            state.entities = keyBy(payload.datas, 'id');
            state.listLoaded = true;
            state.listStatus = 'idle';
        },

        bannerFormChanged: new PreparedCaseReducer<BannerState, BannerFormData, number | null>(
            (state: BannerState, {payload, meta}) => {
                state.formData = payload;
                state.formId = typeof meta === 'undefined' ? state.formId : meta as any;
            }
        ),

        deleteBanner: (state, {payload}: PayloadAction<number>) => {
            if (!state.interactingIds.includes(payload)) {
                state.interactingIds.push(payload);
            }
        },

        bannerDeleted: (state: BannerState, {payload}: PayloadAction<number>) => {
            delete state.entities[payload];
            state.ids = state.ids.filter(id => id !== payload);
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        },

        bannerDeleteFailed: (state: BannerState, {payload}: PayloadAction<number>) => {
            state.interactingIds = state.interactingIds.filter(id => id !== payload);
        }
    }
});

export const {
    bannerFormChanged,
    bannerDeleteFailed,
    bannerDeleted,
    deleteBanner,
    listBannersLoaded,
    singleBannerAdded,
    refreshListBanner,
    submitBannerForm,
    bannerFormSubmitted
} = slice.actions;

export const bannerFormIdChange = createAction<number>('banner/formIdChange');
export const loadSingleBanner = createAction<number>('banner/loadSingle');

const bannerReducer = slice.reducer;

export default bannerReducer;
