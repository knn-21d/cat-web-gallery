import { MockedCommentType } from '../../../../api/fish-text.types';
import { Button } from '../../../../components/button/button';
import { getUser } from '../../../../utils/local-storage';
import { CommentInput } from '../comment-input/comment-input';
import styles from './comment-item.module.css';

type CommentItemProps = {
  comment: MockedCommentType;
  onDeleteComment: (comment: MockedCommentType) => void;
  isEdit?: boolean;
  onEditComment?: (comment: MockedCommentType) => void;
  onEditConfirm?: (comment: MockedCommentType) => void;
  onEditCancel?: () => void;
};

export function CommentItem({
  comment,
  onDeleteComment,
  isEdit,
  onEditComment,
  onEditConfirm,
  onEditCancel,
}: CommentItemProps) {
  return (
    <div className={styles['comment-item']}>
      <div className={styles['top-row']}>
        <div className={styles['comment-data']}>
          <span>
            <b>Username: </b>
            {comment.isOwn ? getUser()?.login : 'Ivan'}
          </span>
          <span>
            <b>Date: </b>
            {new Date().toLocaleDateString('ru-RU')}
          </span>
        </div>
        {comment.isOwn && (
          <div className={styles['comment-data']}>
            <Button onClick={() => onDeleteComment(comment)}>Delete</Button>
            <Button onClick={() => onEditComment?.(comment)}>Edit</Button>
          </div>
        )}
      </div>
      <div>
        {isEdit && onEditConfirm && onEditCancel ? (
          <CommentInput
            onSend={(text) => onEditConfirm({ ...comment, text })}
            onCancel={onEditCancel}
            initialValue={comment.text}
          ></CommentInput>
        ) : (
          <span>{comment.text}</span>
        )}
      </div>
    </div>
  );
}
