import React, { createContext, useRef, useState } from 'react';
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { CustomSimpleBar } from './components/CustomSimpleBar';
import SimpleBar from 'simplebar-react';

export interface SearchContextType {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}
export const SearchContext = createContext<SearchContextType | null>(null);

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const appScrollbar = useRef<SimpleBar>(null);

  return (
    <CustomSimpleBar ref={appScrollbar}>
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart appScrollbar={appScrollbar} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </CustomSimpleBar>
  );
};

export { App };
