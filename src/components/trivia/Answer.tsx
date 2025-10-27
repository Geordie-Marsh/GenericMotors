// Dependencies
import styles from "@/styles/components/trivia/Answer.module.scss";
import buttonStyles from "@/styles/components/Button.module.scss";

import * as Button from "@/components/Button";

interface AnswerProps {
	children: React.ReactNode;
	className?: string;
	isCorrect?: boolean;
	isSelected?: boolean;
	answered?: boolean;
	onClick?: () => void;
	ref?: React.RefObject<HTMLButtonElement | null>;
}

export default function Answer({children, className, isCorrect, isSelected, answered, onClick, ref}: AnswerProps) {
	  return (
		<div 
			className={ styles.answer }
			data-correct={ isCorrect ? "true" : "false" }
			data-selected={ isSelected ? "true" : "false" }
			data-answered={ answered ? "true" : "false" }>
			<button 
				className={` 
					${buttonStyles.button}
					${buttonStyles.large}
					${className}
				`} 
				ref={ref}
				onClick={onClick}
			>
				<h3>
					{/* <Button.Large className={ styles.button } onClick={onClick}>{ children }</Button.Large> */}
					{/* <button className={`${styles.button} ${styles.large} ${className}`} onClick={ onClick }>{children}</button> */}
					{ children }
				</h3>
			</button>
		</div>
	);
}