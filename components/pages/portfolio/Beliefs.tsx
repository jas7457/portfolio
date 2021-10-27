import AnimateOnScreen from '@app/components/AnimateOnScreen';
import React, { useState } from 'react';
import clsx from 'clsx';

import Circle from '@app/assets/svg/circle.svg';
import { getHex } from '@app/utils/getHexColors';

export default function Beliefs({ className }: { className?: string }) {
	const [selectedBeliefIndex, setSelectedBeliefIndex] = useState(0);

	return (
		<AnimateOnScreen
			className={clsx(className, 'transition duration-1000')}
			idleClassName="opacity-0"
			offScreenClassName="translate-y-48 opacity-0"
			onScreenClassName="translate-y-0 opacity-100"
			intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
		>
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
		</AnimateOnScreen>
	);
}

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
					I believe in the power of declarative UI. Frameworks such as React has really changed the front end landscape.
					Concepts such as immutable state, unidirectional data flow, and component composition lead to clearer, less
					error prone code.
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
					Besides TypeScript, I love to utilize GraphQL for the server integration. These two technologies have a lot of
					overlap and play very nicely together.
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
					I believe the web is made for everyone. Accessibility is a key part of the web, and I believe it's everyone's
					part to contribute.
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
