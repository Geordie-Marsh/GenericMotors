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
import vwTiguan from "@/assets/images/cars/volkswagen-tiguan.webp";
import volvoXC60 from "@/assets/images/cars/volvo-xc60.webp";




// Registering GSAP plugins
gsap.registerPlugin(TextPlugin, CustomEase);



// In this game, two cars are shown side by side, and the player has to guess whether the cars are the same or different.




export default function Compare() {
	// States
	const [score, setScore] = useState(0);
	const [accuracy, setAccuracy] = useState(0);
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [firstImageSrc, setFirstImageSrc] = useState("");
	const [secondImageSrc, setSecondImageSrc] = useState("");
	const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer

	// Refs
	const sameButtonRef = useRef<HTMLButtonElement | null>(null);
	const differentButtonRef = useRef<HTMLButtonElement | null>(null);
	const firstCarRef = useRef<HTMLImageElement | null>(null);
	const secondCarRef = useRef<HTMLImageElement | null>(null);
	const scoreRef = useRef<HTMLSpanElement | null>(null);
	const firstCarContRef = useRef<HTMLDivElement | null>(null);
	const secondCarContRef = useRef<HTMLDivElement | null>(null);


	const cars = [
		audiQ5,
		bmwX3,
		gwmHavalH6,
		hondaCRV,
		hyundaiTucson,
		mazdaCX5,
		nissanXTrail,
		toyotaRAV4,
		//vwTiguan,
		volvoXC60
	];






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
						firstCarRef.current!.src = firstCar.src;
						secondCarRef.current!.src = secondCar.src;
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
		console.log("Player guessed: ", guessedSame ? "Same" : "Different");
		// Tell player if they were correct
		console.log("Correct answer: ", areSame ? "Same" : "Different");

		let newScore = score;
		if (guessedSame === areSame) {
			// Correct guess
			newScore += 1;
			setScore(newScore);
		}
		const newRoundsPlayed = roundsPlayed + 1;
		setRoundsPlayed(newRoundsPlayed);
		const newAccuracy = Math.round((newScore / newRoundsPlayed) * 100);
		setAccuracy(newAccuracy);

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


	setTimeout(() => {
		// Initial load of cars
		if (firstImageSrc === "" && secondImageSrc === "") {
			newCars();
		}
	}, 100);

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
					width={ 16 }
					height={ 16 }
				/>
			</Button.Small>
			<p>Score: <b><span ref={ scoreRef }>0</span>%</b></p>
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
			><h3>Same</h3></Button.Large>
			<Button.Large 
				className={`${styles.compareButton}, ${styles.different}`} 
				ref={ differentButtonRef }
				onClick={ () => { different() } }
			><h3>Different</h3></Button.Large>
		</div>
	</div>
  );
}