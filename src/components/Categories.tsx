import React, { FC } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';

interface CategoriesProps {
  categoryId: number;
  setCategoryId: (index: number) => void;
  setCurrentPage: (page: number) => void;
}

const Categories: FC<CategoriesProps> = ({ categoryId, setCategoryId, setCurrentPage }) => {
  function changeCategory(id: number) {
    setCategoryId(id);
    setCurrentPage(1);
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
};

export { Categories };
