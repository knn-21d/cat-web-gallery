import styles from './comment-item.module.css';

type CommentItemProps = {
  comment: string;
};

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className={styles['comment-item']}>
      <div className={styles['top-row']}>
        <span>
          <b>Username: </b>Ivan
        </span>
        <span>
          <b>Date: </b>
          {new Date().toLocaleDateString('ru-RU')}
        </span>
      </div>
      <div>
        <span>{comment}</span>
      </div>
    </div>
  );
}
