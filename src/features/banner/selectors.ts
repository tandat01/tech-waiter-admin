import AppState from '../../App.state';
import {Banner} from '../../models/banner';
import {createSelector} from '@reduxjs/toolkit';

export const selectBannerState = (state: AppState) => state.banner;

export const selectBannerFormLoading = createSelector(
  selectBannerState,
  state => state.formStatus === 'loading'
);

export const selectBannerFormData = createSelector(
  selectBannerState,
  state => state.formData
);

export const selectBannerFormId = createSelector(
  selectBannerState,
  state => state.formId
);

export const selectBannerOfForm = createSelector(
    selectBannerState,
    state => state.entities[state.formId ?? '']
);

export const selectListBanners = createSelector(
  selectBannerState,
  state => state.ids.map(id => state.entities[id] as Banner)
);

export const selectSingleBanner = (id: number) => createSelector(
  selectBannerState,
  (state) => state.entities[id]
);

export const selectBannerIds = createSelector(
  selectBannerState,
  state => state.ids
);

export const selectBannerListLoading = createSelector(
    selectBannerState,
    state => state.listStatus === 'loading'
);
