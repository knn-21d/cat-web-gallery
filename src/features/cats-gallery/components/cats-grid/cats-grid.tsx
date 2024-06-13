import { useState } from 'react';
import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import { CatDetailModal } from '../cat-detail-modal/cat-detail-modal';
import styles from './cats-grid.module.css';

type CatsGridProps = {
  cats: MockedCataasCatsModel[];
};

export function CatsGrid({ cats }: CatsGridProps) {
  const [openedCat, setOpenedCat] = useState<MockedCataasCatsModel | null>(
    null,
  );

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
        onSetCat={setOpenedCat}
        isOpen={openedCat !== null}
        cat={openedCat}
      ></CatDetailModal>
    </div>
  );
}
