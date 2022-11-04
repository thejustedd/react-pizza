import React, { FC, MouseEvent } from 'react';
import logoSvg from '../assets/img/pizza-logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setDefaultFilters } from '../redux/filters/slice';

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    dispatch(setDefaultFilters());
    navigate('/');
  }

  return (
    <a className="logo" href="/" onClick={handleClick}>
      <img width="38" src={logoSvg} alt="Pizza logo" />
      <div>
        <h1>React Pizza</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </a>
  );
};

export { Logo };
