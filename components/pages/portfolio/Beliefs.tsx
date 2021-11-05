import clsx from 'clsx';
import React, { useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import { GiArrowCursor } from 'react-icons/gi';
import { MdHealthAndSafety, MdOutlineAccessibility } from 'react-icons/md';
import { SiReact } from 'react-icons/si';

import Circle from '@app/assets/svg/circle.svg';
import AnimateOnScreen from '@app/components/AnimateOnScreen';
import Heading, { HeadingLevel } from '@app/components/Heading';
import getHexColor from '@app/utils/getHexColor';

export default function Beliefs({ className }: { className?: string }) {
	const [selectedBeliefIndex, setSelectedBeliefIndex] = useState(0);

	return (
		<AnimateOnScreen
			className={clsx(className, 'transition duration-1000 space-y-8')}
			idleClassName="opacity-0"
			offScreenClassName="translate-y-48 opacity-0"
			onScreenClassName="translate-y-0 opacity-100"
			intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
		>
			<p>
				Over my career I've worked with many different technologies and many different developers. I try to stay abreast
				on the ever-changing front end landscape. Throughout the years, I've learned what I consider to be best
				practices and general guidelines to use when building web applications.
			</p>

			<ol className="grid grid-cols-2 md:grid-cols-5">
				{beliefs.map((belief, index) => (
					<li key={belief.title} className={belief.classes} onMouseOver={() => setSelectedBeliefIndex(index)}>
						<div className="relative flex justify-center">
							<Circle
								width={150}
								height={150}
								className="transition-transform"
								strokeWidth="1px"
								style={{
									transform: selectedBeliefIndex === index ? 'scale(1)' : 'scale(0.30)',
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
								height={15}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
							/>
						</div>
						<div className="text-center">
							<button
								className="uppercase font-semibold cursor-auto"
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
				{beliefs.map(({ title, Icon, children, color }, index) => (
					<div
						key={title}
						className={clsx(
							'transition-opacity duration-500',
							selectedBeliefIndex === index ? 'opacity-100' : 'opacity-0'
						)}
						aria-hidden={selectedBeliefIndex !== index}
						style={{ gridColumn: '1 / 1', gridRow: '1 / 1' }}
					>
						<Heading className="flex items-center space-x-2 text-2xl mt-8 mb-4" style={{ color }}>
							<span>{title}</span>
							<Icon />
						</Heading>
						<HeadingLevel>{children}</HeadingLevel>
					</div>
				))}
			</div>
		</AnimateOnScreen>
	);
}

const beliefs: Array<{
	title: string;
	color: string;
	children: React.ReactNode;
	Icon: React.ComponentType;
	classes?: string;
}> = [
	{
		title: 'Responsive',
		color: getHexColor('yellow'),
		Icon: FaMobileAlt,
		children: (
			<div className="space-y-4">
				<p>
					I believe that websites should work well on any device. Whether you are browsing a website on your 4K desktop
					monitor or your iPhone on the bus, you should have a good experience.
				</p>

				<p>
					Similarly, websites should be <b>fast</b>. I think it's important to code split websites and use purged
					utility CSS to ship the smallest bundle size to end users as possible.
				</p>
			</div>
		),
	},
	{
		title: 'Declarative',
		color: getHexColor('blue'),
		Icon: SiReact,
		children: (
			<div className="space-y-4">
				<p>
					I believe in the power of declarative UI. Frameworks such as React have really changed the front end
					landscape. Concepts such as <b>immutable state</b>, unidirectional data flow, and component composition lead
					to clearer, less error prone code.
				</p>
			</div>
		),
	},
	{
		title: 'Type-Safe',
		color: getHexColor('green'),
		Icon: MdHealthAndSafety,
		children: (
			<div className="space-y-4">
				<p>
					I, like most web developers, started my career exclusively using JavaScript to develop websites. I was
					introduced to TypeScript in 2015 and haven't looked back since.
				</p>

				<p>
					I'm a big believer that TypeScript and other type-safe languages have numerous benefits. Fewer bugs, faster
					coding, and <b>confidence</b> in your application are just a few of the advantages.
				</p>

				<p>
					Besides TypeScript, I love to utilize GraphQL for API integrations. Providing type safety both on the front
					end and back end leads to truly scalable applications.
				</p>
			</div>
		),
	},
	{
		title: 'Accessible',
		color: getHexColor('red'),
		Icon: MdOutlineAccessibility,
		children: (
			<div className="space-y-4">
				<p>
					I believe the web is made for <b>everyone</b>. Accessibility is a key part of the web, and I believe it's
					everyone's part to contribute. This is an often overlooked aspect of the web and only addressed due to fear of
					consequence, but I'm an advocate of developing for it and not against it.
				</p>
			</div>
		),
	},
	{
		title: 'Interactive',
		color: getHexColor('teal'),
		Icon: GiArrowCursor,
		classes: 'col-start-1 col-end-3 md:col-auto',
		children: (
			<div className="space-y-4">
				<p>
					Web apps have pushed the web to great lengths. I pay close attention to the design and implementation of the
					pages I build and how the interactions on the site create a dynamic and <b>cohesive</b> user experience.
				</p>
			</div>
		),
	},
];
