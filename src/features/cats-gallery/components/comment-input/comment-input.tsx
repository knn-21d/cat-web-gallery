import { Button } from '../../../../components/button/button';
import { TextArea } from '../../../../components/textarea/textarea';
import styles from './comment-input.module.css';

export function CommentInput() {
  return (
    <div className={styles.wrapper}>
      <TextArea></TextArea>
      <Button appType='primary'>Send</Button>
    </div>
  );
}
