"use client";

// Importing styles
import styles from "./page.module.scss";

// Importing components
import Image from "next/image";
import GameLink from "@/components/GameLink";

// Importing images
import triviaLength from "@/assets/images/trivia/length001.webp";
import logoCombHoriz from "@/assets/logo/logo-comb-horiz.svg";



export default function Home() {
  return (
    <div className={ styles.page }>
      <main className={ styles.main }>
		<div className={ styles.titleCont }>
			{/* <h1>Generic Motors</h1> */}
			<Image
				src={ logoCombHoriz }
				alt="Generic Motors Logo"
				className={ styles.logo }
				priority
			/>
			{/* <h3>One of a kind</h3> */}
		</div>
		<p className={ styles.desc }>Comparing cars is difficult; the list of differences between all the makes and models is endless.<br /><br />To help you out, we&apos;ve designed a suite of games that&apos;ll let you compare all your options.</p>
		<div className={ styles.gamesCont }>
			<GameLink 
				href="/trivia" 
				title="Trivia Challenge"
				description="Test your knowledge of car facts and figures"
				imgSource={ triviaLength }
			/>
		</div>
      </main>
    </div>
  );
}
