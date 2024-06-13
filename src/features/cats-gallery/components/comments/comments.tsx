import { useCallback, useState } from 'react';
import { CommentInput } from '../comment-input/comment-input';
import { CommentItem } from '../comment-item/comment-item';
import styles from './comments.module.css';
import { getFishText } from '../../../../api/fish-text';
import { FetchTrigger } from '../../../../components/fetch-trigger/fetch-trigget';
import {
  addComment,
  getComments,
  removeComment,
  updateComment,
} from '../../../../utils/local-storage';
import { MockedCommentType } from '../../../../api/fish-text.types';

type CommentsProps = {
  postId: string;
};

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<MockedCommentType[]>([
    ...getComments(postId),
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [editingComment, setEditingComment] = useState<MockedCommentType | null>(null);

  const sendCommentHandler = (comment: string) => {
    const id = Date.now();
    setComments((prev) => [{ text: comment, isOwn: true, id }, ...prev]);
    addComment(postId, comment, id);
  };

  const deleteCommentHandler = (comment: MockedCommentType) => {
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
    removeComment(postId, comment.id);
  };

  const editCancelHandler = () => {
    setEditingComment(null);
  }

  const editConfirmHandler = (comment: MockedCommentType) => {
    setComments((prev) => prev.map((c) => c.id === comment.id ? comment : c));
    setEditingComment(null);
    updateComment(postId, comment.id, comment.text);
  }

  const commentsFetchHandler = useCallback(async () => {
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
          <CommentItem
            onDeleteComment={deleteCommentHandler}
            key={comment.id}
            comment={comment}
            onEditComment={(comment) => setEditingComment(comment)}
            isEdit={editingComment?.id === comment.id}
            onEditCancel={editCancelHandler}
            onEditConfirm={editConfirmHandler}
          ></CommentItem>
        ))}
        <FetchTrigger
          isLoading={isLoading}
          onFetch={commentsFetchHandler}
        ></FetchTrigger>
      </div>
    </div>
  );
}
