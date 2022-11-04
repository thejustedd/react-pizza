import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Order, sortLabel, sortMethods, SortProperty, SortType } from '../models';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { selectSortType } from '../redux/filters/selectors';
import { setSortType } from '../redux/filters/slice';
import clsx from 'clsx';

interface SortProps {}

const Sort: FC<SortProps> = memo(() => {
  const { property, order } = useAppSelector(selectSortType);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  function handleClickOutside(e: MouseEvent) {
    if (!e.composedPath().includes(sortRef.current!)) setIsVisible(false);
  }

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function choiceFilter(sortType: SortType) {
    dispatch(setSortType(sortType));
  }

  function getSortLabel(property: SortProperty, order: Order) {
    return `${sortLabel[property]} ${order === 'desc' ? '-' : '+'}`;
  }

  return (
    <div className='sort' ref={sortRef} onClick={toggleVisibility}>
      <div className='sort__label'>
        <svg
          className={clsx('sort__arrow', {
            'sort__arrow--rotated': isVisible,
          })}
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{getSortLabel(property, order)}</span>
      </div>
      {isVisible && (
        <div className='sort__popup'>
          <ul>
            {sortMethods.map((sortMethod, index) => (
              <li
                key={index}
                onClick={() => choiceFilter(sortMethod)}
                className={
                  sortMethod.property === property && sortMethod.order === order ? 'active' : ''
                }>
                {getSortLabel(sortMethod.property, sortMethod.order)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export { Sort };
