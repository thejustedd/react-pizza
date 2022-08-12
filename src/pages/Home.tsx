import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import React, { FC, useEffect, useRef, useState } from 'react';
import { categories, Order, SortProperty } from '../models';
import { Pagination } from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { initialFilterState, setFilters } from '../redux/slices/filterSlice';
import { filterByTitle } from '../utils';
import { useSearchParams } from 'react-router-dom';
import { fetchPizzas, Pizza, useStatus } from '../redux/slices/pizzasSlice';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { categoryId, sortType, currentPage, searchValue } = useAppSelector(
    (state) => state.filter,
  );
  const allPizzas = useAppSelector((state) => state.pizza.items);
  const [filteredPizzas, setFilteredPizzas] = useState(allPizzas);
  const { isLoading } = useStatus();
  const [itemsCount, setItemsCount] = useState(0);
  const itemsPerPage = 12;
  const isMounted = useRef(false);
  const isLocationFilled = useRef(false);
  const elems = filteredPizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);
  const skeletons = Array(itemsPerPage)
    .fill(null)
    .map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    if (window.location.search) {
      const page = Number(searchParams.get('page')) || currentPage;
      const category = Number(searchParams.get('category')) || categoryId;
      const sortBy = (searchParams.get('sortBy') || sortType.property) as SortProperty;
      const order = (searchParams.get('order') || sortType.order) as Order;

      dispatch(
        setFilters({
          currentPage: page,
          categoryId: category,
          sortType: { property: sortBy, order },
        }),
      );

      isLocationFilled.current = true;
    }
  }, []);

  useEffect(() => {
    setParam(currentPage, initialFilterState.currentPage, 'page');
    setParam(sortType.property, initialFilterState.sortType.property, 'sortBy');
    setParam(sortType.order, initialFilterState.sortType.order, 'order');
    setParam(categoryId, initialFilterState.categoryId, 'category');
    setSearchParams(searchParams);
  }, [currentPage, sortType, categoryId]);

  function setParam<T extends Object>(val: T, initVal: T, key: string) {
    val !== initVal ? searchParams.set(key, val.toString()) : searchParams.delete(key);
  }

  useEffect(() => {
    (isMounted.current || !isLocationFilled.current) && fetchAllPizzas();
    isMounted.current = true;
  }, [currentPage, sortType, categoryId]);

  async function fetchAllPizzas() {
    const paramsLine = `page=${currentPage}&sortBy=${sortType.property}&order=${sortType.order}${
      categoryId ? `&category=${categoryId}` : ''
    }`;

    dispatch(fetchPizzas(paramsLine));
  }

  useEffect(() => {
    const filtered = searchValue
      ? allPizzas.filter((i) => filterByTitle(i, searchValue))
      : allPizzas;
    setItemsCount(filtered.length);
    setFilteredPizzas(getItemsPerPage(filtered));
  }, [allPizzas, searchValue]);

  function getItemsPerPage(items: Pizza[]) {
    return items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  function getCategoryName() {
    return categories[categoryId];
  }

  function getPageCount() {
    return itemsCount ? Math.ceil(itemsCount / itemsPerPage) : 1;
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">
          {getCategoryName()} пиццы ({itemsCount})
        </h2>
        {!isLoading && !elems.length ? (
          <p style={{ marginBottom: '60px' }}>К сожалению по заданным фильтрам пиццы не найдено</p>
        ) : (
          <div className="content__items">{isLoading ? skeletons : elems}</div>
        )}
        <Pagination pageCount={getPageCount()} />
      </div>
    </>
  );
};

export { Home };
