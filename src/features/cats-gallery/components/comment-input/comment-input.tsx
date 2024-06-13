import { useState } from 'react';
import { Button } from '../../../../components/button/button';
import { TextArea } from '../../../../components/textarea/textarea';
import styles from './comment-input.module.css';

type CommentInputProps = {
  onSend: (text: string) => void;
};

export function CommentInput({ onSend }: CommentInputProps) {
  const [commentValue, setCommentValue] = useState('');
  
  return (
    <div className={styles.wrapper}>
      <TextArea value={commentValue} onChange={(e) => {console.log(e); setCommentValue(e.target.value)}}></TextArea>
      <Button onClick={() => onSend(commentValue)} appType='primary'>Send</Button>
    </div>
  );
}
