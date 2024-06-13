import { Button } from '../button/button';
import styles from './pagination.module.css';

type PaginationProps = {
  onChangePage: (page: number) => void;
  onCountChange: (count: number) => void;
  pagesCount: number;
  currentPage: number;
};

export function Pagination({
  onChangePage,
  onCountChange,
  pagesCount,
  currentPage,
}: PaginationProps) {
  const pagesArray =
    pagesCount > 5
      ? generatePageNumbers(pagesCount, currentPage)
      : [...Array(pagesCount).keys()];
  return (
    <div className={styles.container}>
      {pagesArray.map((page, i) => (
        <Button
          appType={page === currentPage ? 'primary' : 'default'}
          key={i}
          onClick={() =>
            typeof page === 'number' ? onChangePage(page) : () => {}
          }
        >
          {page}
        </Button>
      ))}
      <select
        defaultValue={10}
        onChange={(e) => onCountChange(+e.target.value)}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
}

function generatePageNumbers(
  totalPages: number,
  currentPage: number,
): (number | string)[] {
  const pagesToShow = 5;
  const startIndex = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endIndex = Math.min(startIndex + pagesToShow - 1, totalPages);

  const pageNumbers: (number | string)[] = [];

  if (startIndex > 2) {
    pageNumbers.push(...[1, '...']);
  }

  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(i);
  }

  if (endIndex < totalPages - 1) {
    pageNumbers.push('...', totalPages);
  }

  return pageNumbers;
}
