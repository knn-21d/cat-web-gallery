import { useCallback, useEffect, useState } from 'react';
import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import { getCatsCountAPI, getCatsPageAPI } from '../../../../api/cataas';
import { DEFAULT_LIMIT } from '../../../../utils/pagination';
import { Pagination } from '../../../../components/pagination/pagination';
import { CatsGrid } from '../../components/cats-grid/cats-grid';

export function CatsPage() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(DEFAULT_LIMIT);
  const [cats, setCats] = useState<MockedCataasCatsModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const pageChangeHandler = useCallback(async () => {
    const newCats = await getCatsPageAPI(page, count);
    setCats(newCats);
  }, [page, count]);

  const loadTotalCatsCount = useCallback(async () => {
    const { count } = await getCatsCountAPI();
    setTotalCount(count);
  }, []);

  const pagesCount = Math.ceil(totalCount / count);

  useEffect(() => {
    pageChangeHandler();
  }, [pageChangeHandler]);

  useEffect(() => {
    loadTotalCatsCount();
  }, [loadTotalCatsCount]);

  return (
    <>
      <CatsGrid cats={cats}></CatsGrid>
      <Pagination
        onCountChange={setCount}
        currentPage={page}
        onChangePage={setPage}
        pagesCount={pagesCount}
      ></Pagination>
    </>
  );
}
