"use client";

// Dependencies
import { useRef, useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image, { StaticImageData } from "next/image";
import * as Button from "@/components/Button";

// Importing icons
import iconClose from "@/assets/icons/close.svg";

// Importing images
import audiQ5 from "@/assets/images/cars/audi-q5.webp";
import bmwX3 from "@/assets/images/cars/bmw-x3.webp";
import gwmHavalH6 from "@/assets/images/cars/gwm-haval-h6.webp";
import hondaCRV from "@/assets/images/cars/honda-cr-v.webp";
import hyundaiTucson from "@/assets/images/cars/hyundai-tucson.webp";
import mazdaCX5 from "@/assets/images/cars/mazda-cx-5.webp";
import nissanXTrail from "@/assets/images/cars/nissan-x-trail.webp";
import toyotaRAV4 from "@/assets/images/cars/toyota-rav4.webp";
import volvoXC60 from "@/assets/images/cars/volvo-xc60.webp";
// TODO: Import more car images here as needed

// Registering GSAP plugins
gsap.registerPlugin(TextPlugin, CustomEase);

export default function Find() {
	const gameTimeLength = 30; // seconds

	// States
	const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
	const [ difficulty, setDifficulty ] = useState<"easy" | "medium" | "hard">("hard");
	const [ timeLeft, setTimeLeft ] = useState<number>(gameTimeLength);
	const [ score, setScore ] = useState<number>(0);
	// const [ gridCars, setGridCars ] = useState<StaticImageData[]>([]);
	const [ desiredCar, setDesiredCar ] = useState<StaticImageData>(audiQ5); // Default desired car
	const [ gameOver, setGameOver ] = useState<boolean>(false);

	// Refs
	const introContRef = useRef<HTMLDivElement | null>(null);
	const timerRef = useRef<HTMLHeadingElement | null>(null);
	const scoreRef = useRef<HTMLSpanElement | null>(null);
	const findContRef = useRef<HTMLDivElement | null>(null);
	const desiredCarRef = useRef<HTMLImageElement | null>(null);
	const gameContRef = useRef<HTMLDivElement | null>(null);

	const finishedContRef = useRef<HTMLDivElement | null>(null);
	const finishedPreScoreRef = useRef<HTMLHeadingElement | null>(null);
	const finishedScoreRef = useRef<HTMLHeadingElement | null>(null);
	const finishedMessageRef = useRef<HTMLParagraphElement | null>(null);
	const finishedButtonsContRef = useRef<HTMLDivElement | null>(null);

	const carImages = [
		audiQ5,
		bmwX3,
		gwmHavalH6,
		hondaCRV,
		hyundaiTucson,
		mazdaCX5,
		nissanXTrail,
		toyotaRAV4,
		volvoXC60,
	];


	useEffect(() => {
    	let loadedCount = 0;

    	carImages.forEach((img) => {
     		const image = new window.Image();
     		image.src = img.src; // important: Next.js images are objects
     		image.onload = () => {
     			loadedCount++;
     			if (loadedCount === carImages.length) {
     				setIsLoaded(true);
     			}
     		};
     	});
 	}, []);



	// Number of cars in the grid depending on difficulty
	const noOfCars = useMemo(() => {
		switch (difficulty) {
			case "easy":
				return 4;
			case "medium":
				return 6;
			case "hard":
				return 12;
			default:
				return 6;
		}
	}, [difficulty]);




	useEffect(() => {
		if (!gameOver) return;

		// End the game - hide cars, show final score screen
		gameContRef.current!.style.pointerEvents = "none"; // Disable further clicks
		gameContRef.current!.style.visibility = "hidden";


		// Log final score
		// console.log(`Final Score: ${score}, Rounds Played: ${roundsPlayed}, Accuracy: ${accuracy}%`);

		showFinishedScreen();


		const calculateScoreWorth = (score: number, difficulty: "easy" | "medium" | "hard") => {
			switch (difficulty) {
				case "easy":
					if (score < 10) return "low";
					else if (score < 15) return "medium";
					else return "high";
				case "medium":
					if (score < 8) return "low";
					else if (score < 12) return "medium";
					else return "high";
				case "hard":
					if (score < 5) return "low";
					else if (score < 8) return "medium";
					else return "high";
				default:
					return "high";
			}
		};
		const scoreWorth = calculateScoreWorth(score, difficulty);



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
					innerText: `${ score }`,
					duration: duration,
					ease: CustomEase.create("custom", "M0,0 C0.03,0 0.136,0 0.164,0 0.353,0 0.46,0.05 0.527,0.127 0.6,0.21 0.686,0.362 0.727,0.501 0.769,0.646 0.826,1.001 0.826,1.001 0.826,1.001 0.884,1 1,1 "),
					snap: {
						innerText: 1
					}
				}
			);

			// Change the colour depending on the score (which also depends on the difficulty)
			const scoreColor = scoreWorth === "low" ? "#ff505b" // Red
				: scoreWorth === "medium" ? "#fbbf24" // Yellow
				: "#22c55e"; // Green

			setTimeout(() => {
				finishedScore!.style.color = scoreColor;
			}, duration * 1000 * 0.829);

			// After the count up is done, animate in the messages
			setTimeout(() => {
				animateInMessages();
			}, duration * 1000 + 300);
		}


		function animateInMessages() {
			// const finishedAccuracy = finishedAccuracyRef.current;
			const finishedMessage = finishedMessageRef.current;



			const finalMessage =
				scoreWorth === "high" && difficulty === "hard" ? "Wow! You've got a keen eye! Very impressive."
				: scoreWorth === "high" ? "Wow! You've got a keen eye! Wanna try a difficulty up?" 
				: scoreWorth === "medium" ? `Good score, but let's see if you can get into the green zone!`
				: score <= 0 ? "Yikes... that didn't go well. Try your luck again?"
				: `Come on, you can do better than ${score}! Let's try again!`;


			// // Type in the accuracy message letter by letter
			// gsap.to(finishedAccuracy, {
			// 	duration: accuracyMessage.length * 0.02,
			// 	text: accuracyMessage,
			// 	ease: "power1.in"
			// });	

			// Type in the final message letter by letter
			gsap.to(finishedMessage, {
				text: finalMessage,
				ease: "power1.in",
				duration: finalMessage.length * 0.02,
				// delay: accuracyMessage.length * 0.02 + 0.8,
				onComplete: () => {
					// After all messages are done, show the buttons
					setTimeout(() => {
						animateInButtons();
					}, 800);
				}
			});
		}


		function animateInButtons() {
			const finishedButtonsCont = finishedButtonsContRef.current;
			if (!finishedButtonsCont) return;

			// Animate in the buttons 
			// Get the buttons inside the buttons container
			const buttons = Array.from(finishedButtonsCont!.children);
			// Make the buttons visible
			buttons.forEach((button) => {
				(button as HTMLElement).style.visibility = "visible";
			});

			gsap.fromTo(buttons, {
				opacity: 0,
			}, {
				opacity: 1,
				duration: 0.3, 
				stagger: 0.2,
			});
		}


	}, [gameOver]);






	function newGame(difficultyLevel: "easy" | "medium" | "hard" = "easy") {
		// Reset score and timer
		setScore(0);
		setTimeLeft(gameTimeLength);
		setDifficulty(difficultyLevel);
		// Make the timer black again
		if (timerRef.current) {
			timerRef.current.style.color = "#181818";
		}



		// Animate out the intro container
		const introCont = introContRef.current;
		if (introCont) {
			gsap.to(introCont, {
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					introCont.remove();

					preGame();
				}
			});
		}

		function preGame() {
			// Start the pre-game countdown
			let countdown = 3;

			const countdownInterval = setInterval(() => {
				setTimeLeft(countdown);

				// Show the countdown
				timerRef.current!.style.visibility = "visible";

				if (countdown <= 0) {
					clearInterval(countdownInterval);
					// Start the game
					startGame();
					return;
				}
				countdown--;
			}, 1000);
		}

		function startGame() {
			// Show the cars
			gameContRef.current!.style.visibility = "visible";
			

			// Set the timer
			setTimeLeft(gameTimeLength);

			// Start the timer countdown
			// Clear any existing timer
			const timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => {
					// When the time reaches 5, turn the timer red
					if (prevTime === 6) {
						timerRef.current!.style.color = "#ff505b";
					}

					if (prevTime <= 1) {
						clearInterval(timerInterval);
						
						// End the game
						setGameOver(true);
						
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}





		

		// Pick a new desired car
		const newDesiredCar = carImages[Math.floor(Math.random() * carImages.length)];
		setDesiredCar(newDesiredCar);
		// This will trigger useMemo to reset the grid
	}

	const gridCars = useMemo(() => {
		const newCarsList: StaticImageData[] = [];
		while (newCarsList.length < noOfCars) {
			const randomCar = carImages[Math.floor(Math.random() * carImages.length)];
			if (randomCar !== desiredCar) {
				newCarsList.push(randomCar);
			}
		}

		// Insert the desired car at a random position in the grid, except for the first position
		const desiredCarPosition = Math.floor(Math.random() * (noOfCars - 1)) + 1;
		newCarsList[desiredCarPosition] = desiredCar;

		return newCarsList;
	}, [desiredCar]);


	function handleCarSelection(selectedCar: StaticImageData) {
		// If the selected car is correct, add a point. If it's incorrect, subtract a point (including going negative)
		// Then pick a new desired car and reset the grid
		let flashColor: string;
		return () => {
			if (selectedCar === desiredCar) {
				setScore((prevScore) => prevScore + 1);

				// Flash the screen green for correct selection
				flashColor = "#22c55e";
			} else {
				setScore((prevScore) => prevScore - 1);

				// Flash the screen red for incorrect selection
				flashColor = "#ff505b";
			}


			const tl = gsap.timeline();
				tl.to(
					findContRef.current,
					{
						backgroundColor: flashColor,
						duration: 0.2,
						ease: "power1.in"
					}
				)
				.to(
					findContRef.current,
					{
						// Revert back to original background, don't hardcode white in case of dark mode
						backgroundColor: "#f2f4f6",
						duration: 0.2,
						delay: 0.2,
						ease: "power1.out"
					}
				);

			// Pick a new desired car
			const tl2 = gsap.timeline();

			tl2.to({}, {duration: 0.2}) // Dummy tween to create a delay
				.to(
					desiredCarRef.current,
					{
						y: 100,
						opacity: 0,
						duration: 0.3,
						ease: "power2.out",
						onComplete: () => {
							// Change the desired car image after the tween
							let newDesiredCar = desiredCar;
							while (newDesiredCar === desiredCar) {
								newDesiredCar = carImages[Math.floor(Math.random() * carImages.length)];
							}
							setDesiredCar(newDesiredCar);
						}
					}
				)
				.to ({}, {duration: 0.15}) // Another dummy tween to create a delay
				.to(
					desiredCarRef.current,
					{
						y: -100,
						opacity: 0,
						duration: 0,
					}
				)
				.to(
					desiredCarRef.current,
					{
						y: 0,
						opacity: 1,
						duration: 0.3,
						ease: "power2.out"
					}
				);
		};
	}
	

	if (!isLoaded) {
    	return (
    		<div style={{
        		display: "flex",
        		justifyContent: "center",
        		alignItems: "center",
        		height: "100vh"
     		}}>
       			<p>Loading images...</p>
      		</div>
    	);
  	}



  return (
	<div className={styles.findCont} ref={ findContRef }>
		<header>
			<Button.Small className={ styles.close } onClick={ () => {
				// Close the trivia - go back to home page
				window.location.href = "/";
			} }>
				<Image 
					src={ iconClose } 
					alt="Close icon" 
				/>
			</Button.Small>
			<h2 className={ styles.timer } ref={ timerRef }>{ timeLeft }</h2>
			<p className={ styles.score }>Score: <b ref={ scoreRef }>{score}</b></p>
		</header>

		<div className={ styles.desiredCarCont }>
			<h3>Find this car:</h3>
			<div className={ styles.desiredCarImageCont }>
				<Image 
					src={ desiredCar } 
					alt="Car to find" 
					className={ styles.desiredCarImage }
					ref={ desiredCarRef }
				/>
			</div>
		</div>

		<div className={ styles.gameCont } ref={ gameContRef }>
			{/* Show a grid of car images */}
			{/* Assign the class to the grid depending on the difficulty */}
			<div className={ `${styles.carGrid} ${styles[`carGrid--${difficulty}`]}` }>
				{Array.from({ length: noOfCars }).map((_, index) => (
					<div className={ styles.carCont } key={ index } onClick={
						// On selection, add a point and reset the grid
						handleCarSelection(gridCars[index])
					}>
						<Image src={ gridCars[index] } alt={`Car ${index + 1}`} className={ styles.carImage } />
					</div>
				))}
			</div>
		</div>




		<div className={ styles.introCont } ref={ introContRef }>
			<h2>Same / Different</h2>
			<p>See how well you can tell apart our models.<br /><br />You&apos;ll be shown two cars and you have to identify if they&apos;re the same or different. Try to get as many right as you can within the time limit!</p>
			<div className={ styles.buttonsCont }>
				<Button.Large className={ styles.beginButton } onClick={ () => {
					// Start the trivia with the function
					setTimeout(() => {
						newGame("easy");
					}, 300);
				} }>
					<h3>Easy mode</h3>
				</Button.Large>
				<Button.Large className={ styles.beginButton } onClick={ () => {
					// Start the trivia with the function
					setTimeout(() => {
						newGame("medium");
					}, 300);
				} }>
					<h3>Medium mode</h3>
				</Button.Large>
				<Button.Large className={ styles.beginButton } onClick={ () => {
					// Start the trivia with the function
					setTimeout(() => {
						newGame("hard");
					}, 300);
				} }>
					<h3>Hard mode</h3>
				</Button.Large>
			</div>
		</div>




		<div className={ styles.finishedCont } ref={ finishedContRef }>
			<div className={ styles.finalScoreCont }>
				<h3 className={ styles.finishedPreScore } ref={ finishedPreScoreRef }>You scored...</h3>
				<h1 className={ styles.finishedScore } ref={ finishedScoreRef }>0</h1>
			</div>
			{/* <p className={ styles.finishedAccuracy } ref={ finishedAccuracyRef }></p> */}
			<p className={ styles.finalMessage } ref={ finishedMessageRef }></p>
			<div className={ styles.interactionsCont }>
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
  )
}