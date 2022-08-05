import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock/PizzaBlock';
import { Pizza } from './models';
import { Skeleton } from './components/PizzaBlock';

const App = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6290adf9665ea71fe1385b55.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? Array(6)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} />)
                : pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { App };
