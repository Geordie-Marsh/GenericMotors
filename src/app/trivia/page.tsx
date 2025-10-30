"use client";

// Dependencies
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
import Answer from "@/components/trivia/Answer";
import * as Button from "@/components/Button";

// Importing icons
import iconClose from "@/assets/icons/close.svg";

// Importing images
import triviaLength from "@/assets/images/trivia/length001.webp";
import triviaWheelbase from "@/assets/images/trivia/wheelbase001.webp";
import triviaWheelSize from "@/assets/images/trivia/wheelsize002.webp";
import triviaKerbWeight from "@/assets/images/trivia/kerbweight001.webp";
import triviaBootSpace from "@/assets/images/trivia/bootspace001.webp";
import triviaRange from "@/assets/images/trivia/fueltank001.webp";
import triviaShadesOfGrey from "@/assets/images/trivia/greys001.webp";
import triviaPrice from "@/assets/images/trivia/price001.webp";




// Registering GSAP
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(CustomEase);




const questions = [
	{
		questionName: "Length",
		question: "What’s the total length of the car, from the very front to the very back?",
		answers: ["2% shorter than average", "Almost exactly average", "2% longer than average"],
		answerSubtext: ["4.5 metres", "4.6 metres", "4.7 metres"],
		correct: 1,
		image: triviaLength,
	},
	{
		questionName: "Wheelbase",
		question: "What’s the distance between the centres of the wheels?",
		answers: ["2% shorter than average", "Almost exactly average", "2% longer than average"],
		answerSubtext: ["2.7 metres", "2.8 metres", "2.9 metres"],
		correct: 0,
		image: triviaWheelbase,
	},
	{
		questionName: "Wheel size",
		question: "What’s the radius of the wheels (for the base model)?",
		answers: ["Used by 57% of models", "Used by 27% of models", "Used by 16% of models"],
		answerSubtext: ["17 inches", "18 inches", "19 inches"],
		correct: 0,
		image: triviaWheelSize,
	},
	{
		questionName: "Kerb weight",
		question: "What’s the total weight of the vehicle without anything or anyone in it?",
		answers: ["3% lighter than average", "Almost exactly average", "3% heavier than average"],
		answerSubtext: ["1.65 tonnes", "1.70 tonnes", "1.75 tonnes"],
		correct: 0,
		image: triviaKerbWeight,
	},
	{
		questionName: "Boot space",
		question: "How much space is there in the boot (with the back seats up)?",
		answers: ["Fits ~ 6 medium suitcases", "Fits ~ 7 medium suitcases", "Fits ~ 8 medium suitcases"],
		answerSubtext: ["500 litres", "540 litres", "580 litres"],
		correct: 1,
		image: triviaBootSpace,
	},
	{
		questionName: "Range",
		question: "Roughly how far can you drive this car on a full tank?",
		answers: ["5% less than average", "Almost exactly average", "5% more than average"],
		answerSubtext: ["730 km", "770 km", "810 km"],
		correct: 2,
		image: triviaRange,
	},
	{
		questionName: "Shades of grey",
		question: "How many different shades of grey are available for this model?",
		answers: ["1 less than average", "Average", "1 more than average"],
		answerSubtext: ["5 shades", "6 shades", "7 shades"],
		correct: 2,
		image: triviaShadesOfGrey,
	},
	{
		questionName: "Price",
		question: "Finally, given all its standout features, how does this car's base price compare to its competitors (non-luxury, medium petrol SUVs)?",
		answers: ["20% cheaper than average", "Almost exactly average", "20% dearer than average"],
		answerSubtext: ["A$32,000", "A$40,000", "A$48,000"],
		correct: 2,
		image: triviaPrice,
	}
];







export default function Trivia() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [answeredState, setAnsweredState] = useState(false);
	const [score, setScore] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);


	const introContRef = useRef<HTMLDivElement>(null);
	const answersContRef = useRef<HTMLDivElement>(null);
	const questionContRef = useRef<HTMLDivElement>(null);
	const questionTitleRef = useRef<HTMLHeadingElement>(null);
	const questionParagraphRef = useRef<HTMLParagraphElement>(null);
	const scoreRef = useRef<HTMLSpanElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const finishedContRef = useRef<HTMLDivElement>(null);
	const finishedPreScoreRef = useRef<HTMLHeadingElement>(null);
	const finishedScoreRef = useRef<HTMLHeadingElement>(null);
	const finishedMessageInitialRef = useRef<HTMLParagraphElement>(null);
	const finishedMessageTitleRef = useRef<HTMLParagraphElement>(null);
	const finishedMessageDescRef = useRef<HTMLParagraphElement>(null);
	const finishedMessageRef = useRef<HTMLParagraphElement>(null);
	const finishedButtonsContRef = useRef<HTMLDivElement>(null);

	const q = questions[currentQuestion];





	function handleAnswerSelect(answer: string, isCorrect: boolean) {
		if (selectedAnswer) return; // Prevent multiple selections
		setSelectedAnswer(answer);
		
		// If the answer is correct, increment the score
		if (isCorrect) {
			setScore((prev) => prev + 1);
		}
		
		setTimeout(() => {
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



	function finishedTrivia() {
		showFinishedScreen();

		// Get the final score
		const finalScore = Math.round((score / questions.length) * 100) || 0;
		// const finalScore = 20; // Hardcoded to 78% for demo purposes

		function showFinishedScreen() {
			const finishedCont = finishedContRef.current;
			
			// Make it visible
			finishedCont!.style.visibility = "visible";
			
			// Animate it in
			gsap.fromTo(
				finishedCont,
				{ 
					opacity: 0 
				},
				{ 
					opacity: 1, 
					duration: 0.5,
					onComplete: () => {
						setTimeout(() => {
							animateInPreScore();
						}, 200);
					}
				}
			);
		}


		function animateInPreScore() {
			const finishedPreScore = finishedPreScoreRef.current;

			// Animate it in
			gsap.fromTo(
				finishedPreScore,
				{
					opacity: 0
				},
				{
					opacity: 1,
					duration: 0.3,
					onComplete: () => {
						setTimeout(() => {
							animateInScore();
						}, 400);
					}
				}
			)
		}
		
		function animateInScore() {
			const finishedScore = finishedScoreRef.current;

			// Animate it in
			gsap.fromTo(
				finishedScore,
				{
					opacity: 0
				},
				{
					opacity: 1,
					duration: 0.3,
					onComplete: () => {
						setTimeout(() => {
							animateScoreCountUp();
						}, 100);
					}
				}
			)
		}
		
		
		function animateScoreCountUp() {
			const finishedScore = finishedScoreRef.current;

			// Animation parameters
			const duration = 2.3;

			// Animate it in (scale)
			gsap.to(
				finishedScore,
				{
					scale: 1,
					duration: duration,
					//ease: "back.out(6)"
					// ease: CustomEase.create("custom", "cubic-bezier(.28,-0.29,.55,1.88)")
					ease: CustomEase.create("custom", "M0,0 C0.087,0 0.18,-0.16 0.503,-0.16 0.829,-0.16 0.81,1.238 0.83,1.602 0.858,1.284 0.922,1 1,1 "),
				}
			)
		
			// Animate it in (count up)
			gsap.to(
				finishedScore,
				{
					innerText: `${finalScore}%`,
					duration: duration,
					ease: CustomEase.create("custom", "M0,0 C0.03,0 0.136,0 0.164,0 0.353,0 0.46,0.05 0.527,0.127 0.6,0.21 0.686,0.362 0.727,0.501 0.769,0.646 0.826,1.001 0.826,1.001 0.826,1.001 0.884,1 1,1 "),
					snap: {
						innerText: 1
					}
				}
			);

			// Change the colour depending on the score
			let scoreColor = "#ff505b"; // Red by default
			if (finalScore >= 75) {
				scoreColor = "#22c55e"; // Green for 80% and above
			} else if (finalScore >= 50) {
				scoreColor = "#fbbf24"; // Yellow for 50% and above
			}

			setTimeout(() => {
				finishedScore!.style.color = scoreColor;
			}, duration * 1000 * 0.829);

			// After the count up is done, animate in the messages
			setTimeout(() => {
				animateInMessages();
			}, duration * 1000 + 300);
		}


		function animateInMessages() {
			const finishedMessageInitial = finishedMessageInitialRef.current;
			const finishedMessageTitle = finishedMessageTitleRef.current;
			const finishedMessageDesc = finishedMessageDescRef.current;

			const finalMessage =
				finalScore >= 75 ? "Wow... you must be lucky!" 
				: finalScore >= 50 ? "Not bad... you did better than most!"
				: "Well... at least you tried!";


			// Type in the initial message letter by letter
			gsap.to(finishedMessageInitial, {
				duration: finalMessage.length * 0.03,
				text: finalMessage,
				ease: "power1.in"
			});	

			// Fade in the "Did you know?" title after a short delay
			gsap.to(finishedMessageTitle, {
				opacity: 1,
				duration: 0.3,
				delay: finalMessage.length * 0.03 + 0.5,
			});

			// Fade in the description after another short delay
			gsap.to(finishedMessageDesc, {
				opacity: 1,
				duration: 0.3,
				delay: finalMessage.length * 0.03 + 0.8,
				onComplete: () => {
					// After all messages are done, show the buttons
					setTimeout(() => {
						animateInButtons();
					}, 600);
				}
			});
		}


		function animateInButtons() {
			const finishedMessage = finishedMessageRef.current;
			const finishedButtonsCont = finishedButtonsContRef.current;

			// Animate in the message
			gsap.to(finishedMessage,
				{
					opacity: 1,
					duration: 0.3,
			});

			// Animate in the buttons 
			// Get the buttons inside the buttons container
			const buttons = finishedButtonsCont!.children;
			gsap.fromTo(buttons, {
				opacity: 0,
				scale: 0,
			}, {
				scale: 1, 
				opacity: 1,
				duration: 0.3, 
				stagger: 0.2,
				delay: 0.8,
				ease: "back.out(1.1)",
			});
		}
	}





	function postAnswer() {
		// Animate the question text elements and the answers out
		// Get all the elements to animate out (in a list so we can stagger them all)
		// We want all the elements inside both the question container and the answers container and the image
		const animateOutElements = [
			imageRef.current,
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


				// If we've reached the end of the questions, show the finished screen
				if (currentQuestion + 1 >= questions.length) {
					finishedTrivia();
					return;
				}

				// Otherwise, move to the next question
				setCurrentQuestion((prev) => (prev + 1) % questions.length);
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

		// Also, fade in the image
		setTimeout(() => {
			gsap.to(imageRef.current, {
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
			});
		}, 800);
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
	}, [selectedAnswer]);

	

	// Detect when the current question changes to set up the new question
	useEffect(() => {
		// Prevent running on initial render
		if (currentQuestion === 0) return;

		setTimeout(() => {
			newQuestion();
		}, 0);
	}, [currentQuestion]);



	function beginTrivia() {
		// Animate out the intro container
		const introCont = introContRef.current;
		if (introCont) {
			gsap.to(introCont, {
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					introCont.remove();

					// Start the trivia
					setTimeout(() => {
						newQuestion();
					}, 300);
				}
			});
		}

		// Select a random did you know fact for the finished screen
		const finishedMessageDesc = finishedMessageDescRef.current;
		if (finishedMessageDesc) {
			const facts = [
				"The Toyota RAV4 is average in just about every way you can measure. It's also our best-selling model.",
				"Almost none of our models differ by more than 10% in anything. We believe this makes choosing a car easier for our customers.",
			];
			const randomFact = facts[Math.floor(Math.random() * facts.length)];
			console.log("Selected random fact:", randomFact);
			finishedMessageDesc.textContent = randomFact;
		}
	}






	

  return (
	<div className={ styles.triviaCont }>
		<header>
			<Button.Small className={ styles.close } onClick={ () => {
				// Close the trivia - go back to home page
				window.location.href = "/";
			} }>
				<Image 
					src={ iconClose } 
					alt="Close icon" 
					width={ 16 }
					height={ 16 }
				/>
			</Button.Small>
			<p>Score: <b><span ref={ scoreRef }>0</span>%</b></p>
		</header>

		<div className={ styles.imageCont }>
			<Image 
				src={ q.image ? q.image : triviaLength }
				alt={ `Trivia question ${ currentQuestion + 1 } image` } 
				fill 
				sizes="100%"
				ref={ imageRef }
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



		<div className={ styles.introCont } ref={ introContRef }>
			<h2>Trivia</h2>
			<p>Test your knowledge about our most popular model, <b>the Toyota RAV4</b>, by answering a series of questions!</p>
			<Button.Large className={ styles.beginButton } onClick={ () => {
				// Start the trivia with the function
				setTimeout(() => {
					beginTrivia();
				}, 300);
			} }>
				<h3>Begin!</h3>
			</Button.Large>
		</div>



		<div className={ styles.finishedCont } ref={ finishedContRef }>
			<div className={ styles.finalScoreCont }>
				<h3 className={ styles.finishedPreScore } ref={ finishedPreScoreRef }>You scored...</h3>
				<h1 className={ styles.finishedScore } ref={ finishedScoreRef }>0%</h1>
			</div>
			<p className={ styles.finalMessageInitial } ref={ finishedMessageInitialRef }></p>
			<p className={ styles.finalMessage }>
				<b><span className={ styles.finalMessageTitle } ref={ finishedMessageTitleRef }>Did you know?</span></b>
				<br />
				<span className={ styles.finalMessageDesc } ref={ finishedMessageDescRef }></span>
			</p>
			<div className={ styles.interactionsCont }>
				<p className={ styles.message } ref={ finishedMessageRef }>Try your luck again! Or explore our other games.</p>
				<div className={ styles.buttonsCont } ref={ finishedButtonsContRef }>
					<Button.Large className={ styles.retryButton } onClick={ () => {
						// Reset the trivia to try again
						window.location.reload();
					} }>
						<h3>Try again</h3>
					</Button.Large>
					<Button.Large className={ styles.homeButton } onClick={ () => {
						// Go back to home page
						window.location.href = "/";
					} }>
						<h3>More games</h3>
					</Button.Large>
				</div>
			</div>
		</div>
	</div>
  );
}