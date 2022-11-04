import React, { FC } from 'react';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <div className="wrapper">
      <Header />
      <Breadcrumbs />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export { MainLayout };
