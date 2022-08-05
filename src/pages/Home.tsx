import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, Skeleton } from '../components/PizzaBlock';
import React, { useEffect, useState } from 'react';
import { categories, Pizza, SortType } from '../models';

const Home = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortType>({
    label: 'популярности',
    property: 'rating+',
  });

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.property.includes('-') ? 'desc' : 'asc';
    const categoryRequest = categoryId ? `category=${categoryId}` : '';
    const sortRequest = `sortBy=${sortType.property.slice(0, -1)}`;
    const orderRequest = `order=${order}`;
    const request = `${categoryRequest}&${sortRequest}&${orderRequest}`;

    fetch(`https://6290adf9665ea71fe1385b55.mockapi.io/pizzas?${request}`)
      .then((res) => res.json())
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      });
  }, [categoryId, sortType]);

  function getCategoryName() {
    return categories[categoryId];
  }

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
          <Sort sortType={sortType} setSortType={setSortType} />
        </div>
        <h2 className="content__title">{getCategoryName()} пиццы</h2>
        <div className="content__items">
          {isLoading
            ? Array(6)
                .fill(null)
                .map((_, index) => <Skeleton key={index} />)
            : pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
        </div>
      </div>
    </>
  );
};

export { Home };
