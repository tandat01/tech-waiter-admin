import AppState from '../../App.state';
import {createSelector} from '@reduxjs/toolkit';
import {Tag} from '../../models/tag';

export const selectTagState = (state: AppState) => state.tag;

export const selectTagParams = createSelector(
  selectTagState,
  state => state.params
);

export const selectTagPagination = createSelector(
  selectTagState,
  state => state.meta
);

export const selectTagPaginationTotal = createSelector(
    selectTagState,
    state => state.meta?.total
);

export const selectTagListLoading = createSelector(
    selectTagState,
    state => state.listStatus === 'loading'
);

export const selectListTags = createSelector(
  selectTagState,
  state => state.ids.map(id => state.entities[id] as Tag)
);

export const selectSingleTag = (id: number) => createSelector(
  selectTagState,
  (state) => state.entities[id]
);

export const selectTagIds = createSelector(
  selectTagState,
  state => state.ids
);

