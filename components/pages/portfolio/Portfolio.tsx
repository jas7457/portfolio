import Image from 'next/image';
import { TechMap, TechObject } from '../resume/Tech';
import React, { useState } from 'react';
import clsx from 'clsx';

import AnimateOnScreen from '@app/components/AnimateOnScreen';

import Hero from './Hero';
import Beliefs from './Beliefs';

export default function Portfolio() {
	return (
		<>
			<Hero />

			<div className="space-y-24">
				<section>
					<Container>
						<Title>About Me</Title>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<AnimateOnScreen
								className="text-center space-y-4 transition duration-1000"
								idleClassName="opacity-0"
								onScreenClassName="translate-x-0 opacity-100"
								offScreenClassName="-translate-x-32 opacity-0"
								intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
							>
								<Image
									src="/profile.jpg"
									alt="Jason Addleman"
									className="rounded-full"
									width={200}
									height={200}
									priority
								/>
								<div className="text-3xl font-medium text-dark">Who am I?</div>
								<p>
									I'm a front end developer based in Pittsburgh, Pennsylvania. I have a passion for modern technology,
									working and learning with others, and bringing UX interactions to life. Let's{' '}
									<a className="text-primary" href="mailto:jas7457@gmail.com">
										connect!
									</a>
								</p>
							</AnimateOnScreen>

							<TechItems />
						</div>
					</Container>
				</section>

				<section>
					<Container>
						<Title>What I Believe</Title>
						<Beliefs className="mb-48" />
					</Container>
				</section>
			</div>
		</>
	);
}

function TechItems() {
	const [onScreen, setOnScreen] = useState(false);

	const showcaseList: Array<{ tech: TechObject; percent: number }> = [
		{ tech: TechMap.React, percent: 95 },
		{ tech: TechMap.Next, percent: 75 },
		{ tech: TechMap.TypeScript, percent: 90 },
		{ tech: TechMap.JavaScript, percent: 85 },
		{ tech: TechMap.CSS, percent: 85 },
		{ tech: TechMap.Tailwind, percent: 80 },
		{ tech: TechMap.GraphQL, percent: 75 },
		{ tech: TechMap.Node, percent: 80 },
		{ tech: TechMap.Koa, percent: 65 },
	];

	return (
		<AnimateOnScreen
			className="transition duration-1000"
			idleClassName="opacity-0"
			onScreenClassName="translate-x-0 opacity-100"
			offScreenClassName="translate-x-32 opacity-0"
			intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
			onIntersection={() => setOnScreen(true)}
		>
			<ol className="space-y-2">
				{showcaseList.map(({ tech, percent }) => (
					<li key={tech.name} className="flex relative">
						<div className={clsx('relative bg-primary-dark text-white w-36 py-1 px-2')}>
							<div
								className={clsx(
									'flex items-center space-x-2 delay-1000 transition-opacity duration-1000',
									onScreen ? 'opacity-100' : 'opacity-0'
								)}
							>
								<tech.Icon />
								<span>{tech.name}</span>
							</div>
						</div>
						<div className="flex-grow bg-gray-300 flex">
							<div className="flex-grow relative">
								<div
									className={clsx('absolute inset-0 bg-primary')}
									style={{
										width: `${onScreen ? percent : 0}%`,
										transitionProperty: 'width',
										transitionDuration: '1s',
										transitionDelay: '1s',
										transitionTimingFunction: 'cubic-bezier(.08,.11,.4,.13)',
									}}
								></div>
							</div>
							<div className="px-2 flex items-center">{percent}%</div>
						</div>
					</li>
				))}
			</ol>
		</AnimateOnScreen>
	);
}

function Container({ children }: { children: React.ReactNode }) {
	return <div className="max-w-6xl mx-auto w-full px-8">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="flex flex-col items-center text-6xl font-medium text-gray-700 text-center relative my-8 uppercase">
			<AnimateOnScreen
				className="transition duration-500"
				idleClassName="opacity-0"
				offScreenClassName="-translate-x-32 opacity-0"
				onScreenClassName="translate-x-0 opacity-100"
				intersectionObserverOptions={{ threshold: 0.5, rootMargin: '-50px 0px 0px 0px' }}
			>
				{children}
			</AnimateOnScreen>
			<AnimateOnScreen
				className="transition duration-500"
				idleClassName="opacity-0"
				offScreenClassName="translate-x-32 opacity-0"
				onScreenClassName="translate-x-0 opacity-100"
				intersectionObserverOptions={{ threshold: 0.5, rootMargin: '-50px 0px 0px 0px' }}
			>
				<div className="mt-4 w-28 border-b-4 border-current" />
			</AnimateOnScreen>
		</h1>
	);
}
