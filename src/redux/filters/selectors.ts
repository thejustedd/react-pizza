import { RootState } from '../store';

export const selectFilters = (state: RootState) => state.filter;
export const selectSortType = (state: RootState) => state.filter.sortType;
