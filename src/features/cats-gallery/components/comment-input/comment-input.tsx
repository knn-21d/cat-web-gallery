import { useState } from 'react';
import { Button } from '../../../../components/button/button';
import { TextArea } from '../../../../components/textarea/textarea';
import styles from './comment-input.module.css';

type CommentInputProps = {
  onSend: (text: string) => void;
  initialValue?: string;
  onCancel?: () => void;
};

export function CommentInput({
  onSend,
  initialValue,
  onCancel,
}: CommentInputProps) {
  const [commentValue, setCommentValue] = useState(initialValue ?? '');

  return (
    <div className={styles.wrapper}>
      <TextArea
        value={commentValue}
        onChange={(e) => {
          console.log(e);
          setCommentValue(e.target.value);
        }}
      ></TextArea>
      <Button
        onClick={() => {
          onSend(commentValue);
          setCommentValue('');
        }}
        appType='primary'
      >
        Send
      </Button>
      {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    </div>
  );
}
