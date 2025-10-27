"use client";

// Dependencies
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
import Answer from "@/components/trivia/Answer";
import * as Button from "@/components/Button";

const questions = [
	{
		questionName: "Length",
		question: "What’s the total length of the car, from the very front to the very back?",
		answers: ["4.4 metres", "4.5 metres", "4.6 metres"],
		correct: "4.4 metres",
	},
	{
		questionName: "Wheelbase",
		question: "What’s the distance between the centres of the wheels?",
		answers: ["2.6 metres", "2.7 metres", "2.8 metres"],
		correct: "2.7 metres",
	}
];

export default function Trivia() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [score, setScore] = useState(0);

	const q = questions[currentQuestion];

	function handleAnswerSelect(answer: string) {
		setSelectedAnswer(answer);
		if (answer === q.correct) {
			setScore((prev) => prev + 1);
		}
	}

	function handleNextQuestion() {
		setSelectedAnswer(null);
		setCurrentQuestion((prev) => (prev + 1) % questions.length);
	}

	

  return (
	<div className={ styles.triviaCont }>
		<header>
			<Button.Small className={ styles.close }>x</Button.Small>
			<Button.Small className={ styles.score }><p>Score: <span className={ styles.value }><b>0%</b></span></p></Button.Small>
		</header>

		<div className={ styles.imageCont }>

		</div>

		<div className={ styles.questionAndAnswersCont }>
			<div className={ styles.questionCont }>
				<h4>Question 1 of 10</h4>
				<h2>Length</h2>
				<p>{q.question}</p>
				{/* <p>What’s the total length of the car, from the very front to the very back?</p> */}
			</div>
			<div className={ styles.answersCont }>
				{q.answers.map((ans) => {
					const isCorrect = ans === q.correct;
					const isSelected = ans === selectedAnswer;

					return (
						<Answer
							key={ ans }
							isCorrect={ isCorrect }
							isSelected={ isSelected }
							onClick={ () => handleAnswerSelect(ans) }
						>{ ans }</Answer>
					);
					
				})}
				{/* <Answer
				>4.4 metres</Answer>
				<Answer
					className={ styles.answer }
				>4.5 metres</Answer>
				<Answer>4.6 metres</Answer> */}
			</div>
		</div>
	</div>
  );
}
