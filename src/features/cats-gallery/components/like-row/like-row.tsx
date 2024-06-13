import { useState } from 'react';
import { Button } from '../../../../components/button/button';
import styles from './like-row.module.css';
import {
  addDislike,
  addLike,
  getIsLiked,
  getUser,
  removeDislike,
  removeLike,
} from '../../../../utils/local-storage';

type LikeRowProps = {
  id: string;
};

export function LikeRow({ id }: LikeRowProps) {
  const [isLiked, setIsLiked] = useState(getIsLiked(id).like);
  const [isDisliked, setIsDisliked] = useState(getIsLiked(id).dislike);

  const removeDislikeLocal = () => {
    setIsDisliked(false);
    removeDislike(id);
  };

  const removeLikeLocal = () => {
    setIsLiked(false);
    removeLike(id);
  };

  const likeHandler = () => {
    if (!getUser()?.login) {
        return
    }
    if (isDisliked) {
      removeDislikeLocal();
    }
    if (!isLiked) {
      setIsLiked(true);
      addLike(id);
    } else {
      removeLikeLocal();
    }
  };

  const dislikeHandler = () => {
    if (!getUser()?.login) {
        return
    }
    if (isLiked) {
      removeLikeLocal();
    }
    if (isDisliked) {
      removeDislikeLocal();
    } else {
      setIsDisliked(true);
      addDislike(id);
    }
  };

  return (
    <div className={styles.row}>
      <Button appType={isLiked ? 'primary' : 'default'} onClick={likeHandler}>Like</Button>
      <Button appType={isDisliked ? 'primary' : 'default'} onClick={dislikeHandler}>Dislike</Button>
    </div>
  );
}
