import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { FC, memo } from 'react';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  changePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = memo(
  ({ currentPage, pageCount, changePage }) => {
    return (
      <>
        <ReactPaginate
          className={styles.root}
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          onPageChange={(e) => changePage(e.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={() => null}
          forcePage={currentPage - 1}
        />
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.currentPage === nextProps.currentPage && prevProps.pageCount === nextProps.pageCount,
);

export { Pagination };
