import { useState } from 'react';
import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import { CatDetailModal } from '../cat-detail-modal/cat-detail-modal';
import styles from './cats-grid.module.css';

type CatsGridProps = {
  cats: MockedCataasCatsModel[];
  onEditCat: (post: MockedCataasCatsModel) => void;
  onDeleteCat: (post: MockedCataasCatsModel) => void
};

export function CatsGrid({ cats, onEditCat, onDeleteCat }: CatsGridProps) {
  const [openedCat, setOpenedCat] = useState<MockedCataasCatsModel | null>(
    null,
  );

  const editCatHandler = (post: MockedCataasCatsModel) => {
    onEditCat(post);
    setOpenedCat({...post});
  };

  return (
    <div className={styles.wrapper}>
      {cats.map((cat) => (
        <img
          loading='lazy'
          className={styles['cat-img']}
          src={cat.url}
          key={cat._id}
          onClick={() => setOpenedCat(cat)}
        />
      ))}
      <CatDetailModal
        onEditCat={editCatHandler}
        onSetCat={setOpenedCat}
        isOpen={openedCat !== null}
        cat={openedCat}
        onDeleteCat={onDeleteCat}
      ></CatDetailModal>
    </div>
  );
}
