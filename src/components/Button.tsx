// Dependencies
import Link from 'next/link';

import styles from '@/styles/components/Button.module.scss';



interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
  disabled?: boolean;
}

export function Large({ onClick, children, className, ref, disabled }: ButtonProps) {
	return (
		<button className={`${styles.button} ${styles.large} ${className}`} onClick={ onClick } ref={ref} disabled={disabled}>{children}</button>
	);
}

export function Small({ onClick, children, className, ref, disabled }: ButtonProps) {
	return (
		<button className={`${styles.button} ${styles.small} ${className}`} onClick={ onClick } ref={ref} disabled={disabled}>{children}</button>
	);
}