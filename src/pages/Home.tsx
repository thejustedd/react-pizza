import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import React, { FC, useEffect, useRef, useState } from 'react';
import { categories, GetPizzas, Pizza } from '../models';
import { Pagination } from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { initialState, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import { filterByTitle } from '../utils';
import { useSearchParams } from 'react-router-dom';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { categoryId, sortType, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState(0);
  const itemsPerPage = 12;
  const isMounted = useRef(false);
  const isLocationFilled = useRef(false);
  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);
  const skeletons = Array(itemsPerPage)
    .fill(null)
    .map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    if (window.location.search) {
      const page = Number(searchParams.get('page')) || currentPage;
      const category = Number(searchParams.get('category')) || categoryId;
      const sortBy = searchParams.get('sortBy') || sortType.property;
      const order = searchParams.get('order') || sortType.order;

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
    (isMounted.current || !isLocationFilled.current) && fetchPizzas();
    isMounted.current = true;
  }, [currentPage, sortType, categoryId, searchValue]);

  useEffect(() => {
    setParam(currentPage, initialState.currentPage, 'page');
    setParam(sortType.property, initialState.sortType.property, 'sortBy');
    setParam(sortType.order, initialState.sortType.order, 'order');
    setParam(categoryId, initialState.categoryId, 'category');
    setSearchParams(searchParams);
  }, [currentPage, sortType, categoryId]);

  function setParam<T extends Object>(val: T, initVal: T, key: string) {
    val !== initVal ? searchParams.set(key, val.toString()) : searchParams.delete(key);
  }

  function fetchPizzas() {
    setIsLoading(true);

    const request = `page=${currentPage}&sortBy=${sortType.property}&order=${sortType.order}${
      categoryId ? `&category=${categoryId}` : ''
    }`;

    axios
      .get<GetPizzas>(`https://6290adf9665ea71fe1385b55.mockapi.io/items?${request}`)
      .then((res) => {
        const itemsFilteredByTitle = res.data.items.filter((i) => filterByTitle(i, searchValue));

        setItemsCount(itemsFilteredByTitle.length);
        setPizzas(getItemsPerPage(itemsFilteredByTitle));
        setIsLoading(false);
      });
  }

  function getPageCount() {
    return itemsCount ? Math.ceil(itemsCount / itemsPerPage) : 1;
  }

  function getItemsPerPage(items: Pizza[]) {
    return items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  function getCategoryName() {
    return categories[categoryId];
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
        {!isLoading && !items.length ? (
          <p style={{ marginBottom: '60px' }}>К сожалению по заданным фильтрам пиццы не найдено</p>
        ) : (
          <div className="content__items">{isLoading ? skeletons : items}</div>
        )}
        <Pagination pageCount={getPageCount()} />
      </div>
    </>
  );
};

export { Home };
