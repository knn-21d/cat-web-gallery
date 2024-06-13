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
import { LikeRow } from '../like-row/like-row';
import { Button } from '../../../../components/button/button';
import { PostInput } from '../post-input/post-input';
import { deletePost, updatePost } from '../../../../utils/local-storage';

type CatDetailModalProps = {
  isOpen: boolean;
  onSetCat: (cat: MockedCataasCatsModel | null) => void;
  cat: MockedCataasCatsModel | null;
  onEditCat: (post: MockedCataasCatsModel) => void;
  onDeleteCat: (post: MockedCataasCatsModel) => void;
};

export function CatDetailModal({
  isOpen,
  cat,
  onSetCat,
  onEditCat,
  onDeleteCat,
}: CatDetailModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const dialogClickHandler: MouseEventHandler<HTMLDialogElement> = (e) => {
    e.stopPropagation();
    if (e.target instanceof HTMLDialogElement) {
      modalRef.current?.close();
      onSetCat(null);
    }
  };

  const editHandler = (post: MockedCataasCatsModel) => {
    updatePost(post);
    onEditCat(post);
    setDescription((desc) => post.text ?? desc ?? '');
    setIsEdit(false);
  };

  const deleteHandler = () => {
    if (cat) {
      deletePost(cat?._id);
      onDeleteCat(cat);
      onSetCat(null);
    }
  };

  const getText = useCallback(async () => {
    if (cat?.isOwn && cat.text) {
      setDescription(cat.text);
    } else {
      setDescription((await getFishText()).text);
    }
  }, [cat]);

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
            {!isEdit ? (
              <>
                <div className={styles['image-text']}>
                  <img
                    onClick={() => window.open(cat.url)}
                    className={clsx(styles.img, 'pointer')}
                    src={cat.url}
                  />
                  <div className={styles.text}>
                    <div className={styles['top-row']}>
                      <h2>{description.substring(0, 25)}</h2>
                      {cat.isOwn && (
                        <div className={styles['edit-buttons']}>
                          <Button onClick={() => setIsEdit(true)}>Edit</Button>
                          <Button onClick={deleteHandler}>Delete</Button>
                        </div>
                      )}
                    </div>
                    <span>{description}</span>
                  </div>
                </div>
                <LikeRow id={cat._id}></LikeRow>
              </>
            ) : (
              <PostInput
                onSend={editHandler}
                onCancel={() => setIsEdit(false)}
                title='Edit your post:'
                initialPost={cat}
              ></PostInput>
            )}
          </div>
          <Comments postId={cat._id}></Comments>
        </>
      )}
    </dialog>
  );
}
