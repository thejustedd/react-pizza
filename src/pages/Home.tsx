import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { categories, GetPizzas, Pizza } from '../models';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';
import { filterByTitle } from '../utils';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { categoryId, sortType, currentPage } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue } = useContext(SearchContext)!;
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerCategory, setItemsPerCategory] = useState(0);
  const itemsPerPage = useRef(12).current;
  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);
  const skeletons = Array(itemsPerPage)
    .fill(null)
    .map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.order;
    const categoryRequest = categoryId ? `&category=${categoryId}` : '';
    const sortRequest = `sortBy=${sortType.property}`;
    const orderRequest = `order=${order}`;
    const request = `page=${currentPage}&${sortRequest}&${orderRequest}${categoryRequest}`;

    axios
      .get<GetPizzas>(`https://6290adf9665ea71fe1385b55.mockapi.io/items?${request}`)
      .then((res) => {
        const itemsFilteredByTitle = res.data.items.filter((i) => filterByTitle(i, searchValue));

        setItemsPerCategory(itemsFilteredByTitle.length);
        setPizzas(getItemsPerPage(itemsFilteredByTitle));
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    currentPage !== 1 && changePage(1);
  }, [searchValue]);

  function getPageCount() {
    return itemsPerCategory ? Math.ceil(itemsPerCategory / itemsPerPage) : 1;
  }

  function getItemsPerPage(items: Pizza[]) {
    return items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  function getCategoryName() {
    return categories[categoryId];
  }

  function changeCategory(id: number) {
    dispatch(setCategoryId(id));
  }

  function changePage(page: number) {
    dispatch(setCurrentPage(page));
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            setCategoryId={changeCategory}
            setCurrentPage={changePage}
          />
          <Sort />
        </div>
        <h2 className="content__title">
          {getCategoryName()} пиццы ({itemsPerCategory})
        </h2>
        {!isLoading && !items.length ? (
          <p style={{ marginBottom: '60px' }}>К сожалению такой пиццы нет</p>
        ) : (
          <div className="content__items">{isLoading ? skeletons : items}</div>
        )}
        <Pagination currentPage={currentPage} pageCount={getPageCount()} changePage={changePage} />
      </div>
    </>
  );
};

export { Home };
