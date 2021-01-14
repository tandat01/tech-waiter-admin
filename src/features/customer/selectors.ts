import AppState from '../../App.state';
import {Customer} from '../../models/customer';
import {createSelector} from '@reduxjs/toolkit';

export const selectCustomerState = (state: AppState) => state.customer;

export const selectCustomerPagination = createSelector(
    selectCustomerState,
    state => state.meta
);

export const selectCustomerParams = createSelector(
  selectCustomerState,
  state => state.params
);

export const selectCustomerPaginationTotal = createSelector(
    selectCustomerState,
    state => state.meta?.total
);

export const selectCustomerFormLoading = createSelector(
  selectCustomerState,
  state => state.formStatus === 'loading'
);

export const selectCustomerListLoading = createSelector(
    selectCustomerState,
    state => state.listStatus === 'loading'
);

export const selectCustomerFormData = createSelector(
  selectCustomerState,
  state => state.formData
);

export const selectCustomerFormId = createSelector(
  selectCustomerState,
  state => state.formId
);

export const selectCustomerOfForm = createSelector(
    selectCustomerState,
    state => state.entities[state.formId ?? '']
);

export const selectListCustomers = createSelector(
  selectCustomerState,
  state => state.ids.map(id => state.entities[id] as Customer)
);

export const selectSingleCustomer = (id: number) => createSelector(
  selectCustomerState,
  (state) => state.entities[id]
);

export const selectCustomerIds = createSelector(
  selectCustomerState,
  state => state.ids
);

