import Image from 'next/image';
import { TechMap, TechObject } from '../resume/Tech';
import AnimateOnScreen from '@app/components/AnimateOnScreen';
import React, { useState } from 'react';
import clsx from 'clsx';
import Hero from './Hero';

import Circle from '@app/assets/svg/circle.svg';
import { getHex } from '@app/utils/getHexColors';

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
								intersectionObserverOptions={{ threshold: 0.75 }}
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
						<Beliefs />
					</Container>
				</section>
			</div>
		</>
	);
}

function Beliefs() {
	const beliefs: Array<{ title: string; color: string; children: React.ReactNode; classes?: string }> = [
		{
			title: 'Responsive',
			color: getHex('red'),
			children: (
				<div className="space-y-4">
					<p>
						I believe that websites should work well on any device. Whether you are browsing a website on your 30 inch
						desktop monitor or your iPhone on the bus, you should have a good experience.
					</p>

					<p>
						Similarly, websites should be <b>fast</b>. I think it's important to code split websites and use utility CSS
						to ship the smallest bundle size to end users as possible.
					</p>
				</div>
			),
		},
		{
			title: 'Declarative',
			color: getHex('teal'),
			children: (
				<div className="space-y-4">
					<p>
						I believe in the power of declarative UI. Frameworks such as React has really changed the front end
						landscape. Concepts such as immutable state, unidirectional data flow, and component composition lead to
						clearer, less error prone code.
					</p>
				</div>
			),
		},
		{
			title: 'Type-Safe',
			color: getHex('yellow'),
			children: (
				<div className="space-y-4">
					<p>
						I, like most web developers, started my career exclusively using JavaScript to develop websites. I was
						introduced to TypeScript in 2015 and haven't looked back since.
					</p>

					<p>I'm a big believer that TypeScript and other type-safe languages have numerous benefits.</p>

					<ul className="list-disc list-inside">
						<li>Move faster during development</li>
						<li>Provide documentation to other developers</li>
						<li>Make refactoring a preeze</li>
						<li>Ship less bugs</li>
					</ul>

					<p>
						Besides TypeScript, I love to utilize GraphQL for the server integration. These two technologies have a lot
						of overlap and play very nicely together.
					</p>
				</div>
			),
		},
		{
			title: 'Accessible',
			color: getHex('gray'),
			children: (
				<div className="space-y-4">
					<p>
						I believe the web is made for everyone. Accessibility is a key part of the web, and I believe it's
						everyone's part to contribute.
					</p>
				</div>
			),
		},
		{
			title: 'Interactive',
			color: getHex('blue'),
			classes: 'col-start-1 col-end-3 md:col-auto',
			children: (
				<div className="space-y-4">
					<p>
						Web apps have pushed the web to great lengths. I pay close attention to the design and implementation of the
						pages I build and how the interactions on the site create a dynamic and cohesive user experience.
					</p>
				</div>
			),
		},
	];

	const [selectedBeliefIndex, setSelectedBeliefIndex] = useState(0);

	return (
		<div className="mb-48">
			<ol className="grid grid-cols-2 md:grid-cols-5">
				{beliefs.map((belief, index) => (
					<li key={belief.title} className={belief.classes} onMouseOver={() => setSelectedBeliefIndex(index)}>
						<div className="relative flex justify-center">
							<Circle
								width={200}
								className="transition-transform"
								strokeWidth={'1px'}
								style={{
									transform: selectedBeliefIndex === index ? 'scale(1)' : 'scale(0.25)',
								}}
								stroke={belief.color}
								{...(selectedBeliefIndex === index
									? {
											color: belief.color,
											fillOpacity: 0.2,
									  }
									: {
											color: 'transparent',
									  })}
							/>
							<Circle
								color={belief.color}
								width={15}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
							/>
						</div>
						<div className="text-center">
							<button
								className="uppercase font-semibold"
								onFocus={() => setSelectedBeliefIndex(index)}
								style={
									selectedBeliefIndex === index
										? {
												color: belief.color,
										  }
										: {}
								}
							>
								{belief.title}
							</button>
						</div>
					</li>
				))}
			</ol>

			<div className="grid">
				{beliefs.map((belief, index) => (
					<div
						key={belief.title}
						className={clsx(
							'transition-opacity duration-500',
							selectedBeliefIndex === index ? 'opacity-100' : 'opacity-0'
						)}
						style={{ gridColumn: '1 / 1', gridRow: '1 / 1' }}
					>
						<h1 className="text-2xl mt-8 mb-4" style={{ color: belief.color }}>
							{belief.title}
						</h1>
						{belief.children}
					</div>
				))}
			</div>
		</div>
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
			intersectionObserverOptions={{ threshold: 0.75 }}
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
				intersectionObserverOptions={{ threshold: 1, rootMargin: '-50px' }}
			>
				{children}
			</AnimateOnScreen>
			<AnimateOnScreen
				className="transition duration-500"
				idleClassName="opacity-0"
				offScreenClassName="translate-x-32 opacity-0"
				onScreenClassName="translate-x-0 opacity-100"
				intersectionObserverOptions={{ threshold: 1, rootMargin: '-50px' }}
			>
				<div className="mt-4 w-28 border-b-4 border-current" />
			</AnimateOnScreen>
		</h1>
	);
}
