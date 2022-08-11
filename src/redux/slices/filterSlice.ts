import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortMethods, SortType } from '../../models';

export interface FilterState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sortType: SortType;
}

export const initialFilterState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: sortMethods[0],
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initialFilterState,
  reducers: {
    setCategoryId(state: FilterState, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    changeCategoryId(state: FilterState, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.currentPage = 1;
    },
    setSortType(state: FilterState, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state: FilterState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state: FilterState, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    changeSearchValue(state: FilterState, action: PayloadAction<string>) {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setFilters(
      state: FilterState,
      action: PayloadAction<Pick<FilterState, 'currentPage' | 'categoryId' | 'sortType'>>,
    ) {
      state.currentPage = action.payload.currentPage;
      state.sortType.property = action.payload.sortType.property;
      state.sortType.order = action.payload.sortType.order;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
  changeSearchValue,
  changeCategoryId,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
