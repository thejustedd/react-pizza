import { SortType } from '../../models';

export interface FilterState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sortType: SortType;
}
