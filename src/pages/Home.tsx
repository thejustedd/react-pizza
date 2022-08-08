import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import React, { FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { categories, Pizza, SortType } from '../models';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { searchValue } = useContext(SearchContext)!;
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortType>({
    label: 'популярности +',
    property: 'rating+',
  });

  const [itemsPerCategory, setItemsPerCategory] = useState(0);
  const itemsPerPage = useRef(12).current;

  function getPageCount() {
    return itemsPerCategory ? Math.ceil(itemsPerCategory / itemsPerPage) : 1;
  }

  const items = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);
  const skeletons = Array(6)
    .fill(null)
    .map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.property.includes('-') ? 'desc' : 'asc';
    const categoryRequest = categoryId ? `&category=${categoryId}` : '';
    const sortRequest = `sortBy=${sortType.property.slice(0, -1)}`;
    const orderRequest = `order=${order}`;
    const request = `page=${currentPage}&${sortRequest}&${orderRequest}${categoryRequest}`;

    fetch(`https://6290adf9665ea71fe1385b55.mockapi.io/items?${request}`)
      .then((res) => res.json())
      .then((json) => {
        const filterByTitle = (item: Pizza) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase());
        const itemsFilteredByTitle = (json.items as Pizza[]).filter(filterByTitle);

        // setItemsPerCategory(json.count);
        setItemsPerCategory(itemsFilteredByTitle.length);
        setPizzas(getItemsPerPage(itemsFilteredByTitle));
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    currentPage !== 1 && setCurrentPage(1);
  }, [searchValue]);

  function getItemsPerPage(items: Pizza[]) {
    return items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  function getCategoryName() {
    return categories[categoryId];
  }

  function contentItemsBlock(children: ReactNode) {
    return <div className="content__items">{children}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setCurrentPage={setCurrentPage}
          />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">
          {getCategoryName()} пиццы ({itemsPerCategory})
        </h2>
        {isLoading ? (
          contentItemsBlock(skeletons)
        ) : items.length ? (
          contentItemsBlock(items)
        ) : (
          <p style={{ marginBottom: '60px' }}>К сожалению такой пиццы нет</p>
        )}
        <Pagination
          currentPage={currentPage}
          pageCount={getPageCount()}
          changePage={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export { Home };
