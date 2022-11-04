import { MouseEvent, FC, MouseEventHandler } from 'react';
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { setDefaultFilters } from '../../redux/filters/slice';
import classes from './Breadcrumbs.module.scss';
import { useAppRoutes } from '../../shared/constants/routes';

function createBreadcrumbElements(
  breadcrumbs: BreadcrumbData[],
  clickHandler: MouseEventHandler<HTMLAnchorElement>,
) {
  return breadcrumbs.map(({ breadcrumb, match }, idx) => (
    <span key={match.pathname}>
      {breadcrumbs.length === idx + 1 ? (
        breadcrumb
      ) : (
        <NavLink to={match.pathname} onClick={clickHandler}>
          {breadcrumb}
        </NavLink>
      )}
    </span>
  ));
}

interface BreadcrumbsProps {}

const Breadcrumbs: FC<BreadcrumbsProps> = () => {
  const routes = useAppRoutes();
  const breadcrumbs = useBreadcrumbs(Object.values(routes));
  const dispatch = useAppDispatch();

  function handleClick(_: MouseEvent<HTMLAnchorElement>) {
    dispatch(setDefaultFilters());
  }

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className='container'>
        <div className={classes.list}>{createBreadcrumbElements(breadcrumbs, handleClick)}</div>
      </div>
    </div>
  );
};

export { Breadcrumbs };
