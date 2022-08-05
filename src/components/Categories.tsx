import React, { FC } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';

interface CategoriesProps {
  categoryId: number;
  setCategoryId: (index: number) => void;
}

const Categories: FC<CategoriesProps> = ({ categoryId, setCategoryId }) => {
  return (
    // Todo
    <div className="categories">
      <CustomSimpleBar>
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              className={index === categoryId ? 'active' : ''}
              onClick={() => setCategoryId(index)}>
              {categoryName}
            </li>
          ))}
        </ul>
      </CustomSimpleBar>
    </div>
  );
};

export { Categories };
