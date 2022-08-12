import React, { FC, memo } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { changeCategoryId } from '../redux/slices/filterSlice';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = memo(() => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
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
