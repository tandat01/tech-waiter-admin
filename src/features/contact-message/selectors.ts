import AppState from '../../App.state';
import {ContactMessage} from '../../models/contact-message';
import {createSelector} from '@reduxjs/toolkit';

export const selectContactMessageState = (state: AppState) => state.contactMessage;

export const selectContactMessagePagination = createSelector(
    selectContactMessageState,
    state => state.meta
);

export const selectContactMessageParams = createSelector(
  selectContactMessageState,
  state => state.params
);

export const selectContactMessagePaginationTotal = createSelector(
    selectContactMessageState,
    state => state.meta?.total
);

export const selectContactMessageListLoading = createSelector(
    selectContactMessageState,
    state => state.listStatus === 'loading'
);

export const selectListContactMessages = createSelector(
  selectContactMessageState,
  state => state.ids.map(id => state.entities[id] as ContactMessage)
);

export const selectSingleContactMessage = (id: number) => createSelector(
  selectContactMessageState,
  (state) => state.entities[id]
);

export const selectContactMessageIds = createSelector(
  selectContactMessageState,
  state => state.ids
);

export const selectInteractingStateOfMessage = (id?: number) => createSelector(
    selectContactMessageState,
    state => state.interactingIds.includes(id as any)
);

