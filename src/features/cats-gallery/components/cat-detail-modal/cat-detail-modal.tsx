import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './cat-detail-modal.module.css';
import { getFishText } from '../../../../api/fish-text';
import clsx from '../../../../utils/clsx';
import { Comments } from '../comments/comments';

type CatDetailModalProps = {
  isOpen: boolean;
  onSetCat: (cat: MockedCataasCatsModel | null) => void;
  cat: MockedCataasCatsModel | null;
};

export function CatDetailModal({ isOpen, cat, onSetCat }: CatDetailModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [description, setDescription] = useState('');

  const dialogClickHandler: MouseEventHandler<HTMLDialogElement> = (e) => {
    e.stopPropagation();
    if (e.target instanceof HTMLDialogElement) {
      modalRef.current?.close();
      onSetCat(null);
    }
  };

  const getText = useCallback(async () => {
    setDescription(await getFishText());
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      onSetCat(null);
      modalRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !description) {
      getText();
    }
  }, [isOpen, description, getText]);

  return (
    <dialog
      onClick={dialogClickHandler}
      className={styles.modal}
      ref={modalRef}
    >
      {cat && (
        <>
          <div className={styles['container']}>
            <div className={styles['image-text']}>
              <img
                onClick={() => window.open(cat.url)}
                className={clsx(styles.img, 'pointer')}
                src={cat.url}
              />
              <div className={styles.text}>
                <h3>{description.substring(0, 25)}</h3>
                <span>{description}</span>
              </div>
            </div>
          </div>
          <Comments></Comments>
        </>
      )}
    </dialog>
  );
}
