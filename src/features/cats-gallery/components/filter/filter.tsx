import styles from './filter.module.css';
import { TagSelect } from '../tag-select/tag-select';

export type FilterProps = {
  onSetFilter: (value: string) => void;
  filter: string;
  onSetSort(value: 'none' | 'asc' | 'desc'): void;
  sort: 'none' | 'asc' | 'desc';
};

export function Filter({ onSetFilter, filter, sort, onSetSort }: FilterProps) {
  return (
    <div className={styles.container}>
      <TagSelect onSetFilter={onSetFilter} filter={filter}></TagSelect>
      <div className={styles.field}>
        <label htmlFor='sort'>Sort by tags count</label>
        <select
          value={sort}
          onChange={(e) => onSetSort(e.target.value as 'none' | 'asc' | 'desc')}
          name='sort'
        >
          <option value='none'>None</option>
          <option value='asc'>Ascend</option>
          <option value='desc'>Descend</option>
        </select>
      </div>
    </div>
  );
}
