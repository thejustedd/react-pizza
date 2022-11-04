import { lazy } from 'react';
import { Home } from '../../pages';
import { useAppSelector } from '../../redux/store';
import { selectCurrentPizza } from '../../redux/pizzas/selectors';

const Cart = lazy(() =>
  import(/* webpackChunkName: "Cart" */ '../../pages/Cart').then((module) => ({
    default: module.Cart,
  })),
);

const NotFound = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ '../../pages/NotFound').then((module) => ({
    default: module.NotFound,
  })),
);

const PizzaInfo = lazy(() =>
  import(/* webpackChunkName: "PizzaInfo" */ '../../pages/PizzaInfo').then((module) => ({
    default: module.PizzaInfo,
  })),
);

export function useAppRoutes() {
  const pizza = useAppSelector(selectCurrentPizza);
  routes.PIZZA_INFO.breadcrumb = pizza?.title ?? 'Pizza';
  return routes;
}

const routes = Object.freeze({
  HOME: {
    breadcrumb: 'Home',
    path: '',
    component: Home,
  },
  PIZZAS: {
    breadcrumb: 'Pizzas',
    path: 'pizzas',
    component: Home,
  },
  PIZZA_INFO: {
    breadcrumb: 'Pizza',
    path: 'pizzas/:id',
    component: PizzaInfo,
  },
  CART: {
    breadcrumb: 'Cart',
    path: 'cart',
    component: Cart,
  },
  NOT_FOUND: {
    breadcrumb: 'Not Found',
    path: '*',
    component: NotFound,
  },
});
