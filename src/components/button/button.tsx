import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import clsx from '../../utils/clsx';
import styles from './button.module.css';

type ButtonProps = { appType?: 'default' | 'primary' } & DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export function Button(props: ButtonProps) {
	const { appType, className, ...rest } = props;
	return (
		<button
			className={clsx(styles.common, styles[appType ?? 'default'], className)}
			{...rest}
		></button>
	);
}
