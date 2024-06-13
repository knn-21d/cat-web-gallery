import { useState, useCallback, useEffect } from 'react';
import { getTags } from '../../../../api/cataas';
import styles from './tag-select.module.css';

type TagSelectProps = {
  onSetFilter: (value: string) => void;
  filter: string;
};

export function TagSelect({ filter, onSetFilter }: TagSelectProps) {
  const [tags, setTags] = useState<string[]>([]);

  const loadTags = useCallback(async () => {
    const tags = await getTags();
    setTags(tags);
  }, []);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return (
    <div className={styles.field}>
      <label htmlFor='tag'>Tag</label>
      <select
        value={filter}
        onChange={(e) => onSetFilter(e.target.value)}
        name='tag'
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
