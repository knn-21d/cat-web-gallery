import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './input.module.css';
import clsx from '../../utils/clsx';

type InputProps = {
  state?: 'error' | 'default';
  onValueChange?: (value: string) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: InputProps) {
  const { state, onValueChange, onChange, className, ...rest } = props;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
    onChange?.(e);
  };

  return (
    <input
      onChange={changeHandler}
      className={clsx(styles.common, styles[state ?? 'default'], className)}
      {...rest}
    ></input>
  );
}
