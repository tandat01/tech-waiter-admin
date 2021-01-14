import AppState from '../../App.state';
import {createSelector} from '@reduxjs/toolkit';
import {Product} from '../../models/product';


export const selectProductState = (state: AppState) => state.product;

export const selectProductParams = createSelector(
  selectProductState,
  state => state.params
);

export const selectProductPagination = createSelector(
  selectProductState,
  state => state.meta
);

export const selectProductPaginationTotal = createSelector(
    selectProductState,
    state => state.meta?.total
);

export const selectProductFormLoading = createSelector(
  selectProductState,
  state => state.formStatus === 'loading'
);

export const selectProductListLoading = createSelector(
    selectProductState,
    state => state.listStatus === 'loading'
);

export const selectProductFormData = createSelector(
  selectProductState,
  state => state.formData
);

export const selectProductFormId = createSelector(
  selectProductState,
  state => state.formId
);

export const selectProductOfForm = createSelector(
    selectProductState,
    state => state.entities[state.formId ?? '']
);

export const selectListProducts = createSelector(
  selectProductState,
  state => state.ids.map(id => state.entities[id] as Product)
);

export const selectSingleProduct = (id: number) => createSelector(
  selectProductState,
  (state) => state.entities[id]
);

export const selectProductIds = createSelector(
  selectProductState,
  state => state.ids
);

