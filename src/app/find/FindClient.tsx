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
	const [ difficulty, setDifficulty ] = useState<"easy" | "medium" | "hard">("hard");
	const [ timeLeft, setTimeLeft ] = useState<number>(gameTimeLength);
	const [ score, setScore ] = useState<number>(0);
	// const [ gridCars, setGridCars ] = useState<StaticImageData[]>([]);
	const [ desiredCar, setDesiredCar ] = useState<StaticImageData>(audiQ5); // Default desired car

	// Refs
	const timerRef = useRef<HTMLHeadingElement | null>(null);
	const scoreRef = useRef<HTMLSpanElement | null>(null);
	const findContRef = useRef<HTMLDivElement | null>(null);
	const desiredCarRef = useRef<HTMLImageElement | null>(null);

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



	function newGame() {
		// Reset score and timer
		setScore(0);
		setTimeLeft(gameTimeLength);

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

		<div className={ styles.gameCont }>
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
	</div>
  )
}