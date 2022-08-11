import React, { FC, MouseEvent } from 'react';
import logoSvg from '../assets/img/pizza-logo.svg';
import { useDispatch } from 'react-redux';
import { initialState, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    dispatch(setFilters(initialState));
    navigate('/');
  }

  return (
    <a href="/" onClick={handleClick}>
      <div className="header__logo">
        <img width="38" src={logoSvg} alt="Pizza logo" />
        <div>
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </a>
  );
};

export default Logo;
