import React, { FC, memo } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = memo(() => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <CustomSimpleBar>
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              className={index === categoryId ? 'active' : ''}
              onClick={() => {
                dispatch(setCategoryId(index));
                dispatch(setCurrentPage(1));
              }}>
              {categoryName}
            </li>
          ))}
        </ul>
      </CustomSimpleBar>
    </div>
  );
});

export { Categories };
