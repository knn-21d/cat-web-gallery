import { useState } from 'react';
import { TextArea } from '../../../../components/textarea/textarea';
import { TagSelect } from '../tag-select/tag-select';
import styles from './post-input.module.css';
import { Input } from '../../../../components/input/input';
import { MockedCataasCatsModel } from '../../../../api/cataas.types';
import { Button } from '../../../../components/button/button';

type PostInputProps = {
  onSend: (post: MockedCataasCatsModel) => void;
  title?: string;
  onCancel?: () => void;
  initialPost?: MockedCataasCatsModel;
};

export function PostInput({
  onSend,
  title = 'Add a new post:',
  onCancel,
  initialPost,
}: PostInputProps) {
  const [value, setValue] = useState(initialPost?.text ?? '');
  const [tag, setTag] = useState(initialPost?.tags[0] ?? '');
  const [url, setUrl] = useState(initialPost?.url ?? '');

  const clickHandler = () => {
    const post: MockedCataasCatsModel = {
      isOwn: initialPost?.isOwn ?? true,
      url,
      _id: initialPost?._id ?? String(Date.now()),
      mimetype: initialPost?.mimetype ?? 'image/jpeg',
      size: initialPost?.size ?? Math.random(),
      tags: [tag],
      text: value,
    };
    onSend(post);
  };

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <TagSelect filter={tag} onSetFilter={setTag}></TagSelect>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></TextArea>
      <div className={styles.field}>
        <label htmlFor='cat-url'>Cat URL</label>
        <Input value={url} onValueChange={setUrl} name='cat-url'></Input>
      </div>
      <Button onClick={clickHandler} appType='primary'>
        Send
      </Button>
      {onCancel && <Button onClick={onCancel}>Cancel</Button>}
    </div>
  );
}
