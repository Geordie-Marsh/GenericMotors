// Dependencies
import styles from "@/styles/components/trivia/Answer.module.scss";

import * as Button from "@/components/Button";

interface AnswerProps {
	children: React.ReactNode;
	className?: string;
	ref?: React.RefObject<HTMLDivElement | null>;
}

export default function Answer({children, className, ref}: AnswerProps) {
	  return (
		<div className={`${styles.answer} ${className}`} ref={ref}>
			<h3>
				<Button.Large className={ styles.button }>{ children }</Button.Large>
			</h3>
		</div>
	);
}