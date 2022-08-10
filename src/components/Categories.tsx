import React, { FC, memo } from 'react';
import { categories } from '../models';
import { CustomSimpleBar } from './CustomSimpleBar';
import { useSearchParams } from 'react-router-dom';

interface CategoriesProps {
  categoryId: number;
  setCategoryId: (index: number) => void;
  setCurrentPage: (page: number) => void;
}

const Categories: FC<CategoriesProps> = memo(
  ({ categoryId, setCategoryId, setCurrentPage }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    function changeCategory(id: number) {
      setCurrentPage(1);
      setCategoryId(id);
      searchParams.set('category', id.toString());
      searchParams.set('page', '1');
      setSearchParams(searchParams);
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
  },
  (prevProps, nextProps) => prevProps.categoryId === nextProps.categoryId,
);

export { Categories };
