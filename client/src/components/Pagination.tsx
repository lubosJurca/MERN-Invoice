import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

import { useAllInvoicesContext } from '../pages/AllInvoicesPage';

export function PaginationDemo() {
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setSearchParams,
  } = useAllInvoicesContext();

  const renderPaginationButtons = () => {
    let pages = [];

    if (totalPages <= 4) {
      // If total pages are 4 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is in the first part (pages 1 to 3)
      if (currentPage <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      }
      // If current page is near the last pages (last 3 pages)
      else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      }
      // If current page is somewhere in the middle
      else {
        pages = [1, '...', currentPage, '...', totalPages];
      }
    }

    return pages.map((page, index) =>
      page === '...' ? (
        <PaginationEllipsis key={index}>...</PaginationEllipsis>
      ) : (
        <PaginationItem
          key={index}
          onClick={() =>
            setSearchParams((prev) => {
              prev.set('page', page.toString());
              return prev;
            })
          }
        >
          <PaginationLink isActive={currentPage === page} size={'lg'}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <Pagination className='my-8 '>
      <PaginationContent className='flex flex-wrap'>
        {hasPreviousPage && (
          <PaginationItem
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('page', (currentPage - 1).toString());
                return prev;
              })
            }
          >
            <PaginationPrevious size='default' />
          </PaginationItem>
        )}

        {renderPaginationButtons()}
        {hasNextPage && (
          <PaginationItem
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('page', (currentPage + 1).toString());
                return prev;
              })
            }
          >
            <PaginationNext size='default' />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
export default PaginationDemo;
