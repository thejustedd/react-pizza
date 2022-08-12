import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCurrentPage } from '../../redux/slices/filterSlice';

interface PaginationProps {
  pageCount: number;
}

const Pagination: FC<PaginationProps> = memo(
  ({ pageCount }) => {
    const currentPage = useAppSelector((state) => state.filter.currentPage);
    const dispatch = useAppDispatch();

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
