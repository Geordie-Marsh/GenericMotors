// Dependencies
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import styles from '@/styles/components/GameLink.module.scss';

interface GameLinkProps {
	href: string;
	title: string;
	description: string;
	imgSource: string | StaticImageData;
}


export default function GameLink({ href, title, description, imgSource }: GameLinkProps) {
	return (
		<Link href={ href }>
			<div className={ styles.gameLink }>
				<div className={ styles.imageCont }>
					<Image 
						src={ imgSource } 
						alt={ title }  
						sizes="100%"
						className={ styles.image }
					/>
				</div>
				<div className={ styles.textCont }>
					<h3 className={ styles.title }>{ title }</h3>
					<p className={ styles.description }>{ description }</p>
				</div>
			</div>
		</Link>
	);
}