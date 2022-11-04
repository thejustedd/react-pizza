import React, { useRef, useEffect } from 'react';
import './scss/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomSimpleBar } from './components/CustomSimpleBar';
import SimpleBar from 'simplebar-react';
import { MainLayout } from './layouts/MainLayout';
import { withSuspense } from './hocs/withSuspense';
import { useAppSelector } from './redux/store';
import { selectCart } from './redux/cart/selectors';
import { useAppRoutes } from './shared/constants/routes';

const App = () => {
  const { items } = useAppSelector(selectCart);
  const appScrollbar = useRef<SimpleBar>(null);
  const isMounted = useRef(false);
  const routes = useAppRoutes();

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cartItems', json);
    }

    isMounted.current = true;
  }, [items]);

  return (
    <CustomSimpleBar ref={appScrollbar}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path={routes.HOME.path} element={<routes.HOME.component />} />
            <Route path={routes.PIZZAS.path} element={<routes.HOME.component />} />
            <Route
              path={routes.CART.path}
              element={withSuspense(<routes.CART.component appScrollbar={appScrollbar} />)}
            />
            <Route
              path={routes.PIZZA_INFO.path}
              element={withSuspense(<routes.PIZZA_INFO.component />)}
            />
            <Route
              path={routes.NOT_FOUND.path}
              element={withSuspense(<routes.NOT_FOUND.component />)}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomSimpleBar>
  );
};

export { App };
