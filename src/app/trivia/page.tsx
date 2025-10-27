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
	},
	{
		questionName: "Wheel size",
		question: "What’s the radius of the wheels (for the base model)?",
		answers: ["17 inches", "18 inches", "19 inches"],
		correct: "17 inches",
	},
];

export default function Trivia() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [answeredState, setAnsweredState] = useState(false);
	const [score, setScore] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);


	const answersContRef = useRef<HTMLDivElement>(null);
	const questionContRef = useRef<HTMLDivElement>(null);
	// const responseRef = useRef<HTMLParagraphElement>(null);
	//const nextButtonRef = useRef<HTMLButtonElement>(null);

	const q = questions[currentQuestion];

	// function handleAnswerSelect(answer: string) {
	// 	setSelectedAnswer(answer);
	// 	if (answer === q.correct) {
	// 		setScore((prev) => prev + 1);
	// 	}
	// }

	function handleAnswerSelect(answer: string, isCorrect: boolean) {
		if (selectedAnswer) return; // Prevent multiple selections
		setSelectedAnswer(answer);

		setTimeout(() => {
			if (isCorrect) {
				setScore((prev) => prev + 1);
			}
		}, 1600);

		// Set answered state to true
		setAnsweredState(true);
	}

	function postAnswer() {
		// // Shrink the answer buttons away
		// const answers = answersContRef.current?.querySelectorAll(
		// 	// Select all answer divs (not the response text)
		// 	`[data-correct="true"], [data-correct="false"]`
		// );
		// if (!answers) return;
		// gsap.to(answers, {
		// 	scale: 0,
		// 	duration: 0.3,
		// 	stagger: 0.1,
		// 	ease: "power2.in",
		// 	onComplete: () => {
		// 		// When the animation is complete, reset these buttons' states
		// 		// Make original background color
		// 		const answerButtons = answersContRef.current?.querySelectorAll(
		// 			"button"
		// 		);
		// 		answerButtons?.forEach((btn) => {
		// 			(btn as HTMLButtonElement).style.backgroundColor = "";
		// 		});
		// 		// // Make each answer display none
		// 		// answers.forEach((ans) => {
		// 		// 	(ans as HTMLDivElement).style.display = "none";
		// 		// });
				

		// 		// // Show response text
		// 		// if (responseRef.current) {
		// 		// 	responseRef.current.style.display = "block";
		// 		// 	if (selectedAnswer === q.correct) {
		// 		// 		responseRef.current.textContent = "Correct!";
		// 		// 	} else {
		// 		// 		responseRef.current.textContent = `Incorrect. The correct answer was "${q.correct}".`;
		// 		// 	}
		// 		// }
		// 	}
		// });

		// Animate the question text elements and the answers out
		// Get all the elements to animate out (in a list so we can stagger them all)
		// We all the elements inside both the question container and the answers container
		const animateOutElements = [
			...Array.from(questionContRef.current?.children || []),
			...Array.from(answersContRef.current?.children || [])
		];
		gsap.to(animateOutElements, {
			opacity: 0,
			duration: 0.5,
			stagger: 0.075,
			ease: "power2.in",
			onComplete: () => {
				// When the animation is complete, move to the next question
				setAnsweredState(false);
				setSelectedAnswer(null);
				setCurrentQuestion((prev) => (prev + 1) % questions.length);
				
				// Reset the question text and the question name text to be blank
				if (questionContRef.current) {
					const questionNameElem = questionContRef.current.querySelector("h2");
					const questionTextElem = questionContRef.current.querySelector("p");
					if (questionNameElem) questionNameElem.textContent = "";
					if (questionTextElem) questionTextElem.textContent = "";
				}
				// Reset opacity and position of animated elements for next question
				animateOutElements.forEach((el) => {
					(el as HTMLElement).style.opacity = "1";
				});
			}
		});
	}

	useEffect(() => {	
		// Stop this from running twice at the same time
		if (isAnimating) return;
		setIsAnimating(true);

		// After a short delay, animate in the question number
		setTimeout(() => {
			const questionNumber = questionContRef.current?.querySelector("h4");
			if (!questionNumber) return;

			// Animate in the question number
			gsap.fromTo(
				questionNumber,
				{ scale: 0, x: 0, opacity: 1 },
				{ scale: 1, x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
			);

			// After a short delay, type in the question name and question text
			setTimeout(() => {
				typeInQuestionName();
			}, 300);
		}, 700);
		

		function typeInQuestionName() {
			// Type in the question name letter by letter
			const qNameText = q.questionName;
			const questionNameHeading = questionContRef.current?.querySelector("h2");
			if (!questionNameHeading) return;
	
			questionNameHeading.textContent = "";
			let charIndexName = 0;
			const typingIntervalName = setInterval(() => {
				if (charIndexName < qNameText.length) {
					questionNameHeading.textContent += qNameText.charAt(charIndexName);
					charIndexName++;
				} else {
					clearInterval(typingIntervalName);

					// Set a slight delay before starting to type the question text
					setTimeout(() => {
						typeInQuestionText();
					}, 200);
				}
			}, 30); // Adjust typing speed here (milliseconds per character)
		}
		
		function typeInQuestionText() {
			// Type in the question text letter by letter
			const questionText = q.question;
			const questionParagraph = questionContRef.current?.querySelector("p");
			if (!questionParagraph) return;
	
			questionParagraph.textContent = "";
			let charIndex = 0;
			const typingInterval = setInterval(() => {
				if (charIndex < questionText.length) {
					questionParagraph.textContent += questionText.charAt(charIndex);
					charIndex++;
				} else {
					clearInterval(typingInterval);

					// After finishing typing the question, animate in the answers
					setTimeout(() => {
						animateInAnswers();
					}, 200);
				}
			}, 20); // Adjust typing speed here (milliseconds per character)
		}
		

		function animateInAnswers() {
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
					delay: 0.2,
					ease: "power2.out",
					onComplete: () => {
						// Allow further animations after this one is complete
						setIsAnimating(false);
					}
				}
			);
		}
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

		// Depending on whether the answer is right or not, the animation will differ slightly here
		if (selectedAnswer === q.correct) {
			// Wait a moment, then shade the correct answer in green
			setTimeout(() => {
				const correctAnswer = answersContRef.current?.querySelector(
					`[data-correct="true"] button`
				);
				if (correctAnswer) {
					gsap.to(correctAnswer, {
						backgroundColor: "#22c55e",
						duration: 0.4,
					});
				}

				// TODO: Add a little celebratory animation here

				// Wait another moment, then initiate the post-answer sequence
				setTimeout(() => {
					postAnswer();
				}, 700);
			}, 1400);
		} else {
			// Wait a moment, the shade the answer the user picked in red
			setTimeout(() => {
				const correctAnswer = answersContRef.current?.querySelector(
					`[data-selected="true"] button`
				);
				if (correctAnswer) {
					gsap.to(correctAnswer, {
						backgroundColor: "#ff505b",
						duration: 0.4,
					});
				}

				// Wait another moment, then shade the correct answer in green
				setTimeout(() => {
					const correctAnswer = answersContRef.current?.querySelector(
						`[data-correct="true"] button`
					);
					if (correctAnswer) {
						gsap.to(correctAnswer, {
							backgroundColor: "#22c55e",
							duration: 0.4,
						});
					}

					// Wait another moment, then initiate the post-answer sequence
					setTimeout(() => {
						postAnswer();
					}, 700);
				}, 700);
			}, 1400);
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
			<Button.Small className={ styles.score }><p>Score: <span className={ styles.value }><b>{ 
			// Get a percentage score rounded to the nearest whole number, should be out of the total number of questions in the quiz
			(Math.round((score / questions.length) * 100) || 0)
			}%</b></span></p></Button.Small>
		</header>

		<div className={ styles.imageCont }>

		</div>

		<div className={ styles.questionAndAnswersCont }>
			<div className={ styles.questionCont } ref={ questionContRef }>
				<h4>Question {currentQuestion + 1} of 10</h4>
				<h2></h2>
				<p></p>
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

				{/* <p className={ styles.response } ref={ responseRef }>ajfklqdjek</p> */}
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