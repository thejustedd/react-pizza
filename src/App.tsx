import React, { useRef, useState } from 'react';
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { CustomSimpleBar } from './components/CustomSimpleBar';
import SimpleBar from 'simplebar-react';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const appScrollbar = useRef<SimpleBar>(null);

  return (
    <CustomSimpleBar ref={appScrollbar}>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart appScrollbar={appScrollbar} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </CustomSimpleBar>
  );
};

export { App };
