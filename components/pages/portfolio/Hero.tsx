import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import Keyboard from './Keyboard';

import useOnScreen from '@app/hooks/useOnScreen';
import { Colors, getHex } from '@app/utils/getHexColors';

import Circle from '@app/assets/svg/circle.svg';
import HalfCircle from '@app/assets/svg/half-circle.svg';
import Triangle from '@app/assets/svg/triangle.svg';

import styles from './Hero.module.scss';

export default function Hero() {
	const [mouseRatios, setMouseRatios] = useState({ x: 0, y: 0 });

	const ref = useRef(null);
	const onScreen = useOnScreen(ref, { run: 'continuous', threshold: 0.9 });

	return (
		<>
			<section
				ref={ref}
				className="flex items-center justify-center h-screen text-center text-5xl bg-dark dark:bg-white text-white dark:text-text border-b-4 border-primary relative"
				onMouseMove={(e) => {
					const box = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
					const ratios = { x: e.clientX / box.width, y: e.clientY / box.height };

					requestAnimationFrame(() => {
						setMouseRatios(ratios);
					});
				}}
			>
				<div>
					<div>
						Hello, my name is <span className="text-primary">Jason Addleman</span>.
					</div>
					<div>
						I'm a
						<Keyboard
							words={['n Engineering Manager.', ' front end developer.', ' developer advocate.', ' team player.']}
						/>
					</div>
				</div>

				<div
					className={clsx(styles['icon-scroll'], 'transition-opacity', {
						'opacity-0': !onScreen,
						'opacity-100': onScreen,
					})}
				></div>

				<MoveableShape
					Shape={Circle}
					fillColor="transparent"
					strokeColor="teal"
					start={{ x: 15, y: 30 }}
					movement={{ x: 85, y: 50 }}
					mouseRatios={mouseRatios}
				/>
				<MoveableShape
					Shape={Circle}
					fillColor="gray"
					strokeColor="gray"
					start={{ x: 40, y: 83 }}
					movement={{ x: -85, y: -50 }}
					mouseRatios={mouseRatios}
				/>
				<MoveableShape
					Shape={Triangle}
					fillColor="yellow"
					strokeColor="yellow"
					start={{ x: 80, y: 70 }}
					movement={{ x: 85, y: 50 }}
					mouseRatios={mouseRatios}
					transform="rotate(15deg)"
				/>
				<MoveableShape
					Shape={Triangle}
					fillColor="transparent"
					strokeColor="red"
					start={{ x: 90, y: 10 }}
					movement={{ x: -85, y: -50 }}
					mouseRatios={mouseRatios}
					transform="rotate(35deg)"
				/>
				<MoveableShape
					Shape={Triangle}
					fillColor="transparent"
					strokeColor="gray"
					start={{ x: 0, y: -2 }}
					movement={{ x: 85, y: 50 }}
					mouseRatios={mouseRatios}
					transform="rotate(-15deg)"
				/>
				<MoveableShape
					Shape={HalfCircle}
					fillColor="red"
					strokeColor="red"
					start={{ x: 2, y: 75 }}
					movement={{ x: 85, y: 50 }}
					mouseRatios={mouseRatios}
					transform="rotate(135deg)"
				/>
				<MoveableShape
					Shape={HalfCircle}
					fillColor="transparent"
					strokeColor="yellow"
					start={{ x: 45, y: 6 }}
					movement={{ x: -85, y: -50 }}
					mouseRatios={mouseRatios}
					transform="rotate(-45deg)"
				/>
			</section>
		</>
	);
}

function MoveableShape({
	Shape,
	fillColor,
	strokeColor,
	start,
	movement,
	mouseRatios,
	transform,
}: {
	Shape: typeof Circle;
	fillColor: Colors;
	strokeColor: Colors;
	start: { x: number; y: number };
	movement: { x: number; y: number };
	mouseRatios: { x: number; y: number };
	transform?: string;
}) {
	const fillColorHex = getHex(fillColor);
	const strokeColorHex = getHex(strokeColor);

	const translateX = (mouseRatios.x - 0.5) * movement.x;
	const translateY = (mouseRatios.y - 0.5) * movement.y;

	return (
		<Shape
			className="absolute"
			width="50px"
			style={{
				color: fillColorHex,
				top: `${start.y}%`,
				left: `${start.x}%`,
				transform: `translate(${translateX}px, ${translateY}px)${transform ? ` ${transform}` : ''}`,
			}}
			stroke={strokeColorHex}
		/>
	);
}