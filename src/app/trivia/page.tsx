"use client";

// Dependencies
import { useRef, useState, useEffect, use } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
import Answer from "@/components/trivia/Answer";
import * as Button from "@/components/Button";

// Importing icons
import iconClose from "@/assets/icons/close.svg";

// Importing images
import trivia01 from "@/assets/images/trivia/length001.webp";
console.log(trivia01);



// Registering GSAP
gsap.registerPlugin(TextPlugin);



const questions = [
	{
		questionName: "Length",
		question: "What’s the total length of the car, from the very front to the very back?",
		answers: ["2% shorter than average", "Almost exactly average", "2% longer than average"],
		answerSubtext: ["4.5 metres", "4.6 metres", "4.7 metres"],
		correct: 1,
	},
	{
		questionName: "Wheelbase",
		question: "What’s the distance between the centres of the wheels?",
		answers: ["2% shorter than average", "Almost exactly average", "2% longer than average"],
		answerSubtext: ["2.7 metres", "2.8 metres", "2.9 metres"],
		correct: 0,
	},
	{
		questionName: "Wheel size",
		question: "What’s the radius of the wheels (for the base model)?",
		answers: ["Used by 57% of models", "Used by 27% of models", "Used by 16% of models"],
		answerSubtext: ["17 inches", "18 inches", "19 inches"],
		correct: 0,
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
	const questionTitleRef = useRef<HTMLHeadingElement>(null);
	const questionParagraphRef = useRef<HTMLParagraphElement>(null);
	const scoreRef = useRef<HTMLSpanElement>(null);
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

			// Update the score display
			// Use GSAP to animate the score change
			if (scoreRef.current) {
				const newScore = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100) || 0;
				gsap.to(scoreRef.current, {
					duration: 0.5,
					innerText: `${newScore}`,
					snap: {
						innerText: 1
					}
				});
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
				// Reset opacity and position of elements 2 and 3 (question title and paragraph)
				if (questionTitleRef.current) {
					questionTitleRef.current.style.opacity = "1";
					questionTitleRef.current.style.transform = "translateY(0)";
				}
				if (questionParagraphRef.current) {
					questionParagraphRef.current.style.opacity = "1";
					questionParagraphRef.current.style.transform = "translateY(0)";
				}
				// Reset background colors of answer buttons
				const answerButtons = answersContRef.current?.querySelectorAll("button");
				answerButtons?.forEach((btn) => {
					(btn as HTMLButtonElement).style.backgroundColor = "";
				});
			}
		});
	}


	function newQuestion() {
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
	}
	

	function typeInQuestionName() {
		// Type in the question name letter by letter
		const qNameText = q.questionName;
		const questionNameHeading = questionContRef.current?.querySelector("h2");
		if (!questionNameHeading) return;

		questionNameHeading.textContent = "";

		gsap.to(questionNameHeading, {
			duration: qNameText.length * 0.02,
			text: qNameText, 
			ease: "none", 
			onComplete: () => {
				// After finishing typing the question name, animate in the question text
				setTimeout(() => {
					typeInQuestionText();
				}, 200);
			}
		});
	}
	
	function typeInQuestionText() {
		// Type in the question text letter by letter
		const questionText = q.question;
		const questionParagraph = questionParagraphRef.current;
		if (!questionParagraph) return;

		questionParagraph.textContent = "";
		
		// This function is used to type out the new word
		// Using gsap.to() to animate the text change
		gsap.to(questionParagraph, {
			duration: questionText.length * 0.012,
			text: questionText, 
			ease: "none", 
			onComplete: () => {
				// After finishing typing the question, animate in the answers
				setTimeout(() => {
					animateInAnswers();
				}, 200);
			}
		});
	}
	//get a random integer between 14 and 22 inclusive
	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function animateInAnswers() {
		// Animate in the new answer buttons
		const answers = answersContRef.current?.children;
		if (!answers) return;
		gsap.fromTo(
			answers,
			{ 
				scale: 0,
				opacity: 1,
			},
			{ 
				scale: 1, 
				opacity: 1,
				duration: 0.3, 
				stagger: 0.15,
				delay: 0.2,
				ease: "back.out(1.1)",
				onComplete: () => {
					// Allow further animations after this one is complete
					setIsAnimating(false);
				}
			}
		);
	}

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
				ease: "power1.inOut",
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
				ease: "power1.inOut",
			});
		}

		// Depending on whether the answer is right or not, the animation will differ slightly here
		if (selectedAnswer === q.answers[q.correct as number]) {
			// Wait a moment, then shade the correct answer in green
			setTimeout(() => {
				const correctAnswer = answersContRef.current?.querySelector(
					`[data-correct="true"] button`
				);
				if (correctAnswer) {
					gsap.to(correctAnswer, {
						backgroundColor: "#22c55e",
						duration: 0.5,
					});
				}

				// TODO: Add a little celebratory animation here

				// Wait another moment, then initiate the post-answer sequence
				setTimeout(() => {
					postAnswer();
				}, 1000);
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

	

	// Detect when the page first loads to set up the first question
	useEffect(() => {
		newQuestion();
	}, []);

	// Detect when the current question changes to set up the new question
	useEffect(() => {
		// Prevent running on initial render
		if (currentQuestion === 0) return;
		newQuestion();
	}, [currentQuestion]);




	

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
			<Button.Small className={ styles.close }>
				<Image 
					src={ iconClose } 
					alt="Close icon" 
					width={ 16 }
					height={ 16 }
				/>
			</Button.Small>
			<Button.Small className={ styles.score }><p>Score: <b><span ref={ scoreRef }>0</span>%</b></p></Button.Small>
		</header>

		<div className={ styles.imageCont }>
			<Image 
				src={ trivia01 }
				alt={ `Trivia question ${ currentQuestion + 1 } image` } 
				fill 
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</div>

		<div className={ styles.questionAndAnswersCont }>
			<div className={ styles.questionCont } ref={ questionContRef }>
				<h4>Question {currentQuestion + 1} of {questions.length}</h4>
				<h2 ref={ questionTitleRef }></h2>
				<p ref={ questionParagraphRef }></p>
				{/* <p>What’s the total length of the car, from the very front to the very back?</p> */}
			</div>
			<div className={ styles.answersCont } ref={ answersContRef }>
				{q.answers.map((ans) => {
					const isCorrect = q.answers.indexOf(ans) === q.correct;
					const isSelected = ans === selectedAnswer;
					const answered = answeredState;
					const answerSubtext = q.answerSubtext ? q.answerSubtext[q.answers.indexOf(ans)] : null;

					return (
						<Answer
							key={ ans }
							isCorrect={ isCorrect }
							isSelected={ isSelected }
							answered={ answered }
							subtext={ answerSubtext }
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