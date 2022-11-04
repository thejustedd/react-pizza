import React, { FC } from 'react';
import { Search } from './Search';
import { Logo } from './Logo';
import { CartButton } from './CartButton';
import { useLocation } from 'react-router-dom';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const location = useLocation();

  return (
    <div className='header'>
      <div className='container'>
        <div className='header__logo'>
          <Logo />
        </div>
        {(location.pathname === '/' || location.pathname === '/pizzas') && <Search />}
        {location.pathname !== '/cart' && (
          <div className='header__cart'>
            <CartButton />
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
