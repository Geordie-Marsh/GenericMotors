// Dependencies
import styles from "@/styles/components/trivia/Answer.module.scss";

import * as Button from "@/components/Button";

interface AnswerProps {
	children: React.ReactNode;
	className?: string;
	isCorrect?: boolean;
	isSelected?: boolean;
	onClick?: () => void;
	ref?: React.RefObject<HTMLDivElement | null>;
}

export default function Answer({children, className, isCorrect, isSelected, onClick, ref}: AnswerProps) {
	  return (
		<div 
			className={`
				${styles.answer}  
				${className}
				${isSelected ? styles.selected : ""}
				${isCorrect ? styles.correct : ""}
			`} 
			ref={ref}>
			<h3>
				<Button.Large className={ styles.button } onClick={onClick}>{ children }</Button.Large>
			</h3>
		</div>
	);
}