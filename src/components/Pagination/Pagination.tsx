import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentPage } from '../../redux/slices/filterSlice';

interface PaginationProps {
  pageCount: number;
}

const Pagination: FC<PaginationProps> = memo(
  ({ pageCount }) => {
    const currentPage = useSelector((state: RootState) => state.filter.currentPage);
    const dispatch = useDispatch();

    if (currentPage > pageCount || currentPage < 1) return null;

    return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage - 1}
      />
    );
  },
  (prevProps, nextProps) => prevProps.pageCount === nextProps.pageCount,
);

export { Pagination };
