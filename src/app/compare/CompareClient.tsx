"use client";

// Dependencies
import { useRef, useState, useEffect, use } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
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




// Registering GSAP plugins
gsap.registerPlugin(TextPlugin, CustomEase);



// In this game, two cars are shown side by side, and the player has to guess whether the cars are the same or different.




export default function Compare() {
	const gameTimeLength = 30; // seconds

	// States
	const [isLoaded, setIsLoaded] = useState(false);
	
	const [score, setScore] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [firstImageSrc, setFirstImageSrc] = useState(audiQ5);
	const [secondImageSrc, setSecondImageSrc] = useState(bmwX3);
	const [timeLeft, setTimeLeft] = useState(3); // 30 seconds timer
	const [buttonsDisabled, setButtonsDisabled] = useState(true);
	const [gameOver, setGameOver] = useState(false);

	// Refs
	const sameButtonRef = useRef<HTMLButtonElement | null>(null);
	const differentButtonRef = useRef<HTMLButtonElement | null>(null);
	const firstCarRef = useRef<HTMLImageElement | null>(null);
	const secondCarRef = useRef<HTMLImageElement | null>(null);
	const scoreRef = useRef<HTMLSpanElement | null>(null);
	const firstCarContRef = useRef<HTMLDivElement | null>(null);
	const secondCarContRef = useRef<HTMLDivElement | null>(null);
	const introContRef = useRef<HTMLDivElement | null>(null);
	const timerRef = useRef<HTMLHeadingElement | null>(null);

	const finishedContRef = useRef<HTMLDivElement | null>(null);
	const finishedPreScoreRef = useRef<HTMLHeadingElement | null>(null);
	const finishedScoreRef = useRef<HTMLHeadingElement | null>(null);
	// const finishedAccuracyRef = useRef<HTMLParagraphElement | null>(null);
	const finishedMessageRef = useRef<HTMLParagraphElement | null>(null);
	const finishedButtonsContRef = useRef<HTMLDivElement | null>(null);


	const cars = [
		audiQ5,
		bmwX3,
		gwmHavalH6,
		hondaCRV,
		hyundaiTucson,
		mazdaCX5,
		nissanXTrail,
		toyotaRAV4,
		volvoXC60
	];

	useEffect(() => {
    	let loadedCount = 0;

    	cars.forEach((img) => {
     		const image = new window.Image();
     		image.src = img.src; // important: Next.js images are objects
     		image.onload = () => {
     			loadedCount++;
     			if (loadedCount === cars.length) {
     				setIsLoaded(true);
     			}
     		};
     	});
 	}, []);

	



	useEffect(() => {
		if (!gameOver) return;

		// End the game - disable buttons
		setButtonsDisabled(true);

		// Hide the cars
		firstCarRef.current!.style.visibility = "hidden";
		secondCarRef.current!.style.visibility = "hidden";

		// Log final score
		console.log(`Final Score: ${score}, Rounds Played: ${roundsPlayed}, Accuracy: ${accuracy}%`);

		showFinishedScreen();



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

			// Change the colour depending on the score
			let scoreColor = "#ff505b"; // Red by default
			if (score >= 15) {
				scoreColor = "#22c55e"; // Green for 15 and above
			} else if (score >= 10) {
				scoreColor = "#fbbf24"; // Yellow for 10 and above
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
			// const finishedAccuracy = finishedAccuracyRef.current;
			const finishedMessage = finishedMessageRef.current;

			// let accuracyMessage = "";
			// if (score >= 15) {
			// 	accuracyMessage =
			// 		accuracy >= 80 ? `And with an accuracy of ${accuracy}%? Wow!` 
			// 		: accuracy >= 60 ? `With an accuracy of ${accuracy}%... not bad.`
			// 		: `But with an accuracy of... ${accuracy}%? Must be lucky!`;
			// } else {
			// 	accuracyMessage =
			// 		accuracy >= 80 ? `But with an accuracy of ${accuracy}%! That's something!` 
			// 		: accuracy >= 60 ? `With an accuracy of... ${accuracy}%... could be better.`
			// 		: `And an accuracy of... ${accuracy}%? Yikes.`;
			// }

			const finalMessage =
				score >= 15 ? "Wow! You've got a keen eye! Let's see if you can do it again?" 
				: score >= 10 ? "Good score, but let's see if you can get 15 or more!"
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


	






	function newCars() {
		// Select whether the cars are the same or different randomly. 60% different, 40% same
		const isSame = Math.random() < 0.4;

		let firstCar, secondCar;

		if (isSame) {
			// Pick a random car to show on both sides
			const randomIndex = Math.floor(Math.random() * cars.length);
			firstCar = cars[randomIndex];
			secondCar = cars[randomIndex];
		} else {
			// Pick two different random cars to show
			const firstIndex = Math.floor(Math.random() * cars.length);
			let secondIndex = Math.floor(Math.random() * cars.length);
			// Ensure the two indices are different
			while (secondIndex === firstIndex) {
				secondIndex = Math.floor(Math.random() * cars.length);
			}
			firstCar = cars[firstIndex];
			secondCar = cars[secondIndex];
		}
		



		const tl = gsap.timeline();

		tl.to({}, {duration: 0.2}) // Dummy tween to create a delay
			.to(
				[firstCarRef.current, secondCarRef.current],
				{
					y: 100,
					opacity: 0,
					duration: 0.3,
					stagger: 0.1,
					ease: "power2.out",
					onComplete: () => {
						// Update the car images
						setFirstImageSrc(firstCar!);
						setSecondImageSrc(secondCar!);
					}
				}
			)
			.to ({}, {duration: 0.15}) // Another dummy tween to create a delay
			.to(
				[firstCarRef.current, secondCarRef.current],
				{
					y: -100,
					opacity: 0,
					duration: 0,
				}
			)
			.to(
				[firstCarRef.current, secondCarRef.current],
				{
					y: 0,
					opacity: 1,
					duration: 0.3,
					stagger: 0.1,
					ease: "power2.out"
				}
			);
			

		// run the tl
		tl.play();
	}


	function same() {
		// Player guessed "same"
		checkAnswer(true);
	}

	function different() {
		// Player guessed "different"
		checkAnswer(false);
	}

	function checkAnswer(guessedSame: boolean) {
		// Check if the player's guess is correct
		const areSame = firstCarRef.current!.src === secondCarRef.current!.src;

		let newScore = score;
		if (guessedSame === areSame) {
			// Correct guess
			newScore += 1;
			setScore(newScore);
		} else {
			// Incorrect guess
			// Reduce score by 1 (including going negative)
			newScore -= 1;
			setScore(newScore);
		}
		const newRoundsPlayed = roundsPlayed + 1;
		setRoundsPlayed(newRoundsPlayed);
		const newAccuracy = Math.round((newScore / newRoundsPlayed) * 100);
		setAccuracy(newAccuracy);
		// Log these 3 values
		console.log(`Score: ${score}, Rounds Played: ${roundsPlayed}, Accuracy: ${accuracy}%`);

		// // Update score display with animation
		// gsap.to(scoreRef.current, {
		// 	duration: 0.5,
		// 	text: `${newAccuracy}`,
		// 	ease: "power1.out",
		// 	snap: { text: 1 }
		// });


		// Flash the screen green or red based on correctness
		const flashColor = guessedSame === areSame ? "#22c55e" : "#ff505b";
		const tl = gsap.timeline();
		tl.to(
			[firstCarContRef.current, secondCarContRef.current],
			{
				backgroundColor: flashColor,
				duration: 0.3,
				ease: "power1.out"
			}
		)
		.to(
			[firstCarContRef.current, secondCarContRef.current],
			{
				// Revert back to original background, don't hardcode white in case of dark mode
				backgroundColor: "#ffffff",
				duration: 0.3,
				delay: 0.2,
				ease: "power1.out"
			}
		);




		// Load new cars for the next round
		newCars();
	}


	function newGame() {
		// Reset score and rounds played
		setScore(0);
		setRoundsPlayed(0);
		setAccuracy(0);

		newCars();

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
			firstCarRef.current!.style.visibility = "visible";
			secondCarRef.current!.style.visibility = "visible";

			// Enable the buttons
			setButtonsDisabled(false);
			

			// Set the timer
			setTimeLeft(gameTimeLength);

			// Start the timer countdown
			// Clear any existing timer
			const timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => {
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
	}


	




  return (
	<div className={ styles.compareCont }>
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

		<div className={ styles.gameCont }>
			<div className={`${styles.carCont}, ${styles.carCont1}`} ref={ firstCarContRef }>
				<Image src={ firstImageSrc } alt="Car 1" className={ styles.carImage } ref={ firstCarRef } />
			</div>
			<div className={`${styles.carCont}, ${styles.carCont2}`} ref={ secondCarContRef }>
				<Image src={ secondImageSrc } alt="Car 2" className={ styles.carImage } ref={ secondCarRef } />
			</div>
		</div>
		
		<div className={ styles.comparisonButtons }>
			<Button.Large 
				className={`${styles.compareButton}, ${styles.same}`} 
				ref={ sameButtonRef }
				onClick={ () => { same() } }
				disabled={ buttonsDisabled }
			><h3>Same</h3></Button.Large>
			<Button.Large 
				className={`${styles.compareButton}, ${styles.different}`} 
				ref={ differentButtonRef }
				onClick={ () => { different() } }
				disabled={ buttonsDisabled }
			><h3>Different</h3></Button.Large>
		</div>




		<div className={ styles.introCont } ref={ introContRef }>
			<h2>Same / Different</h2>
			<p>See how well you can tell apart our models.<br /><br />You&apos;ll be shown two cars and you have to identify if they&apos;re the same or different. Try to get as many right as you can within the time limit!</p>
			<Button.Large className={ styles.beginButton } onClick={ () => {
				// Start the trivia with the function
				setTimeout(() => {
					newGame();
				}, 300);
			} }>
				<h3>Begin!</h3>
			</Button.Large>
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
  );
}