"use client";

// Dependencies
import { useRef, useState, useEffect, use } from "react";
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
	const [answeredState, setAnsweredState] = useState(false);
	const [score, setScore] = useState(0);

	const answersContRef = useRef<HTMLDivElement>(null);
	//const nextButtonRef = useRef<HTMLButtonElement>(null);

	const q = questions[currentQuestion];

	// function handleAnswerSelect(answer: string) {
	// 	setSelectedAnswer(answer);
	// 	if (answer === q.correct) {
	// 		setScore((prev) => prev + 1);
	// 	}
	// }

	useEffect(() => {	
		// Animate in the new answer buttons
		const answers = answersContRef.current?.children;
		if (!answers) return;
		gsap.fromTo(
			answers,
			{ scale: 0 },
			{ 
				scale: 1, 
				duration: 0.3, 
				stagger: 0.1,
				ease: "power2.out"
			}
		);
	}, [currentQuestion]);

	useEffect(() => {
		// Skip on initial render
		if (!selectedAnswer) return;

		// Log selected answer
		if (selectedAnswer) {
			console.log("Selected answer:", selectedAnswer);
		}

		// Diminish the size of the non-selected answers
		const incorrectAnswers = answersContRef.current?.querySelectorAll(
			`[data-selected="false"]`
		);
		if (incorrectAnswers) {
			gsap.to(incorrectAnswers, {
				scale: 0.95,
				duration: 0.5,
				ease: "power2.inOut",
			});
		}

		// At the same time, change the backgrounds of the non-selected answers to grey
		const incorrectAnswersButtons = answersContRef.current?.querySelectorAll(
			`[data-selected="false"] button`
		);
		if (incorrectAnswersButtons) {
			gsap.to(incorrectAnswersButtons, {
				backgroundColor: "#c4c7c9",
				duration: 0.5,
				ease: "power2.inOut",
			});
		}

		// // At the same time, change all the buttons of the answers to grey
		// const incorrectAnswersButtons = answersContRef.current?.querySelectorAll(
		// 	`div button`
		// );
		// if (incorrectAnswersButtons) {
		// 	gsap.to(incorrectAnswersButtons, {
		// 		backgroundColor: "#c4c7c9",
		// 		duration: 0.5,
		// 		ease: "power2.inOut",
		// 	});
		// }

		// // Highlight the correct answer
		// const correctAnswer = answersContRef.current?.querySelector(
		// 	`[data-correct="true"] button`
		// );
		// if (correctAnswer) {
		// 	gsap.fromTo(
		// 		correctAnswer,
		// 		{ backgroundColor: "#86efac" },
		// 		{ backgroundColor: "#22c55e", duration: 0.4, yoyo: true, repeat: 1 }
		// 	);
		// }
	}, [selectedAnswer]);

	function handleAnswerSelect(answer: string, isCorrect: boolean) {
		if (selectedAnswer) return; // Prevent multiple selections
		setSelectedAnswer(answer);

		if (isCorrect) {
			setScore((prev) => prev + 1);
		}

		// Set answered state to true
		setAnsweredState(true);
	}


	

	// Function to animate in new answer buttons
	/*useEffect(() => {
		// Clear previous buttons
		if (answersContRef.current) {
			answersContRef.current.innerHTML = "";
		}

		// Create new answer buttons dynamically
		q.answers.forEach((ans) => {
			const btn = document.createElement("button");
			btn.textContent = ans;
			btn.className = styles.answer;

			// Mark correct/incorrect answers
			if (ans === q.correct) {
				btn.dataset.correct = "true";
			} else {
				btn.dataset.correct = "false";
			}

			// Handle click
			btn.onclick = () => {
				handleAnswerSelect(btn);
			};

			// Append to container
			answersContRef.current?.appendChild(btn);
		});

		// Animate in the buttons
		if (answersContRef.current) {
			const buttons = answersContRef.current.querySelectorAll("button");
			gsap.fromTo(
				buttons,
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.1,
					duration: 0.4,
					ease: "power2.out",
				}
			);
		}
	}, [currentQuestion]);*/


	/*function handleAnswerSelect(button: HTMLButtonElement) {
		if (selectedAnswer) return; // Prevent multiple selections
		setSelectedAnswer(button.textContent || "");
		console.log("Selected answer:", selectedAnswer);

		// Check if correct
		if (button.dataset.correct === "true") {
			setScore((prev) => prev + 1);
		}

		// Animate out all buttons slightly
		//const buttons = answersContRef.current?.querySelectorAll("button");
		//if (!buttons || buttons.length === 0) return; // <-- narrow/guard before calling gsap
		const buttons = answersContRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [];
		gsap.to(buttons, {
			opacity: 0.5,
			scale: 0.95,
			duration: 0.3,
			stagger: 0.05,
			ease: "power2.inOut",
		});

		// Highlight correct answer
		const correctBtn = answersContRef.current?.querySelector(
			'[data-correct="true"]'
		);
		if (!correctBtn) return; // Guard clause
		gsap.fromTo(
			correctBtn,
			{ scale: 1, backgroundColor: "#86efac" },
			{ scale: 1.15, backgroundColor: "#22c55e", duration: 0.4, yoyo: true, repeat: 1 }
		);


	}*/

	// function handleNextQuestion() {
	// 	setSelectedAnswer(null);
	// 	setCurrentQuestion((prev) => (prev + 1) % questions.length);
	// }

	

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
			<div className={ styles.answersCont } ref={ answersContRef }>
				{q.answers.map((ans) => {
					const isCorrect = ans === q.correct;
					const isSelected = ans === selectedAnswer;
					const answered = answeredState;

					return (
						<Answer
							key={ ans }
							isCorrect={ isCorrect }
							isSelected={ isSelected }
							answered={ answered }
							onClick={ () => handleAnswerSelect(ans, isCorrect) }
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