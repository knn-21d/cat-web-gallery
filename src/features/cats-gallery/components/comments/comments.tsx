import { useCallback, useState } from 'react';
import { CommentInput } from '../comment-input/comment-input';
import { CommentItem } from '../comment-item/comment-item';
import styles from './comments.module.css';
import { getFishText } from '../../../../api/fish-text';
import { FetchTrigger } from '../../../../components/fetch-trigger/fetch-trigget';
import { addComment } from '../../../../utils/local-storage';

type CommentsProps = {
  postId: string;
};

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendCommentHandler = (comment: string) => {
    setComments((prev) => [comment, ...prev]);
    addComment(postId, comment);
  };

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
      <CommentInput onSend={sendCommentHandler}></CommentInput>
      <div className={styles['comment-items']}>
        {comments.map((comment) => (
          <CommentItem key={comment} comment={comment}></CommentItem>
        ))}
        <FetchTrigger
          isLoading={isLoading}
          onFetch={commentsFetchHandler}
        ></FetchTrigger>
      </div>
    </div>
  );
}
