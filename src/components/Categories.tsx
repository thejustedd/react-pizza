import React, { FC, memo, useCallback } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectFilters } from '../redux/filters/selectors';
import { changeCategoryId } from '../redux/filters/slice';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = memo(() => {
  const { categoryId } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  function changeCategory(index: number) {
    dispatch(changeCategoryId(index));
  }

  return (
    <div className="categories">
      <CustomSimpleBar>
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              className={index === categoryId ? 'active' : ''}
              onClick={changeCategory.bind(null, index)}>
              {categoryName}
            </li>
          ))}
        </ul>
      </CustomSimpleBar>
    </div>
  );
});

export { Categories };
