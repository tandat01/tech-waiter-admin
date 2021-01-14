import AppState from '../../App.state';
import {User} from '../../models/user';
import {createSelector} from '@reduxjs/toolkit';

export const selectUserState = (state: AppState) => state.user;

export const selectUserPagination = createSelector(
    selectUserState,
    state => state.meta
);

export const selectUserParams = createSelector(
  selectUserState,
  state => state.params
);

export const selectUserPaginationTotal = createSelector(
    selectUserState,
    state => state.meta?.total
);

export const selectUserFormLoading = createSelector(
  selectUserState,
  state => state.formStatus === 'loading'
);

export const selectUserListLoading = createSelector(
    selectUserState,
    state => state.listStatus === 'loading'
);

export const selectUserFormData = createSelector(
  selectUserState,
  state => state.formData
);

export const selectUserFormId = createSelector(
  selectUserState,
  state => state.formId
);

export const selectUserOfForm = createSelector(
    selectUserState,
    state => state.entities[state.formId ?? '']
);

export const selectListUsers = createSelector(
  selectUserState,
  state => state.ids.map(id => state.entities[id] as User)
);

export const selectSingleUser = (id: number) => createSelector(
  selectUserState,
  (state) => state.entities[id]
);

export const selectUserIds = createSelector(
  selectUserState,
  state => state.ids
);

