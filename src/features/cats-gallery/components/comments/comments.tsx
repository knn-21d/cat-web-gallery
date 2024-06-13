import { useCallback, useState } from 'react';
import { CommentInput } from '../comment-input/comment-input';
import { CommentItem } from '../comment-item/comment-item';
import styles from './comments.module.css';
import { getFishText } from '../../../../api/fish-text';
import { FetchTrigger } from '../../../../components/fetch-trigger/fetch-trigget';

export function Comments() {
  const [comments, setComments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const commentsFetchHandler = useCallback(async () => {
    console.trace({ isLoading });
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const arr = [...new Array(3).keys()];
    const newTexts = await Promise.all(
      arr.map(async () => await getFishText()),
    );
    setComments((prev) => [...prev, ...newTexts]);
    setIsLoading(false);
  }, [isLoading]);

  return (
    <div className={styles['comments']}>
      <CommentInput></CommentInput>
      <div className={styles['comment-items']}>
        {comments.map((comment) => (
          <CommentItem comment={comment}></CommentItem>
        ))}
        <FetchTrigger
          isLoading={isLoading}
          onFetch={commentsFetchHandler}
        ></FetchTrigger>
      </div>
    </div>
  );
}
