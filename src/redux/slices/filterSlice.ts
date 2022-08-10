import { createSlice } from '@reduxjs/toolkit';
import { sortMethods, SortType } from '../../models';

export interface FilterState {
  categoryId: number;
  currentPage: number;
  sortType: SortType;
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  sortType: sortMethods[0],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = action.payload.currentPage;
      state.sortType.property = action.payload.sortType.property;
      state.sortType.order = action.payload.sortType.order;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
