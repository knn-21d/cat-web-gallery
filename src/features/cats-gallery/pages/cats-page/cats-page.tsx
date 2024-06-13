import { useCallback, useEffect, useState } from 'react';
import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import { getCatsCountAPI, getCatsPageAPI } from '../../../../api/cataas';
import { DEFAULT_LIMIT } from '../../../../utils/pagination';
import { Pagination } from '../../../../components/pagination/pagination';
import { CatsGrid } from '../../components/cats-grid/cats-grid';
import { Filter } from '../../components/filter/filter';
import { PostInput } from '../../components/post-input/post-input';
import { addPost, getPosts } from '../../../../utils/local-storage';

type CatsPageProps = {
  isAuthorized: boolean;
};

export function CatsPage({ isAuthorized }: CatsPageProps) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(DEFAULT_LIMIT);
  const [cats, setCats] = useState<MockedCataasCatsModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none');

  const pageChangeHandler = useCallback(async () => {
    let newCats = await getCatsPageAPI(page, count, filter);
    if (sort === 'asc') {
      newCats = [...newCats].sort((a, b) => b.tags.length - a.tags.length);
    } else if (sort === 'desc') {
      newCats = [...newCats].sort((a, b) => a.tags.length - b.tags.length);
    }
    const ownPosts = getPosts();
    setCats(page === 1 ? ownPosts.concat(newCats) : newCats);
  }, [page, count, filter, sort]);

  const editCatHandler = useCallback(
    (cat: MockedCataasCatsModel) => {
      console.log({ cat, cats });
      setCats((cats) => cats.map((c) => (c._id === cat._id ? { ...cat } : c)));
    },
    [cats],
  );

  const deleteCatHandler = useCallback((cat: MockedCataasCatsModel) => {
    setCats((cats) => cats.filter((c) => c._id !== cat._id));
  }, []);

  const loadTotalCatsCount = useCallback(async () => {
    const { count } = await getCatsCountAPI();
    if (page === 1) {
      setTotalCount(count);
    }
  }, [page]);

  const postSendHandler = useCallback(
    (post: MockedCataasCatsModel) => {
      addPost(post);
      pageChangeHandler();
    },
    [pageChangeHandler],
  );

  const pagesCount = Math.ceil(totalCount / count);

  useEffect(() => {
    pageChangeHandler();
  }, [pageChangeHandler]);

  useEffect(() => {
    loadTotalCatsCount();
  }, [loadTotalCatsCount]);

  return (
    <>
      <Filter
        filter={filter}
        onSetFilter={setFilter}
        sort={sort}
        onSetSort={setSort}
      ></Filter>
      {isAuthorized && <PostInput onSend={postSendHandler}></PostInput>}
      <CatsGrid
        onDeleteCat={deleteCatHandler}
        cats={cats}
        onEditCat={editCatHandler}
      ></CatsGrid>
      <Pagination
        onCountChange={setCount}
        currentPage={page}
        onChangePage={setPage}
        pagesCount={pagesCount}
      ></Pagination>
    </>
  );
}
