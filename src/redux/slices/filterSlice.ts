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
  },
});

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
