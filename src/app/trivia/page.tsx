"use client";

// Dependencies
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
import Answer from "@/components/trivia/Answer";
import * as Button from "@/components/Button";

export default function Trivia() {




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
				<p>What’s the total length of the car, from the very front to the very back?</p>
			</div>
			<div className={ styles.answersCont }>
				<Answer
					//ref={ postcard1 } 
				>4.4 metres</Answer>
				<Answer
					className={ styles.answer }
				>4.5 metres</Answer>
				<Answer>4.6 metres</Answer>
			</div>
		</div>
	</div>
  );
}
