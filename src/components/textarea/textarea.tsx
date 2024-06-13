import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './textarea.module.css'
import clsx from '../../utils/clsx';

export function TextArea(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
) {
    return <textarea className={clsx(props.className, styles.textarea)}></textarea>
}
