import { DetailedHTMLProps } from 'react';
import styles from './textarea.module.css';
import clsx from '../../utils/clsx';

export function TextArea(
  props: DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) {
  return (
    <textarea className={clsx(props.className, styles.textarea)} {...props}></textarea>
  );
}
