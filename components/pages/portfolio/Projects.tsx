import Image from 'next/image';

import AnimateOnScreen from '@app/components/AnimateOnScreen';
import React from 'react';
import clsx from 'clsx';

import Heading, { HeadingLevel } from '@app/components/Heading';

import pedxMockup from './images/pedx-mockup.png';
import financesMockup from './images/finances-mockup.png';
import { TechMap, TechObject } from '../resume/Tech';

export default function Projects({ className }: { className?: string }) {
	return (
		<div className={clsx(className)}>
			{projects.map(({ title, tech, children, image, github, website }, index) => {
				const imageSide = (
					<div className="group">
						<div className="relative">
							<Image
								src={image}
								className="scale-95 group-hover:scale-100 group-focus-within:scale-100 opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 transition"
							/>
							{(github || website) && (
								<div className="absolute flex items-center space-x-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
									{(() => {
										const items = [];

										if (github) {
											items.push({ site: github, title: 'Github' });
										}

										if (website) {
											items.push({ site: website, title: 'Website' });
										}

										return items.map(({ site, title }) => (
											<a
												key={site}
												className="bg-gray-800 text-gray-400 hocus:text-white border border-gray-900 px-2 py-1 rounded-full"
												href={site}
												target="_blank"
												rel="noopener noreferrer"
											>
												{title}
											</a>
										));
									})()}
								</div>
							)}
						</div>
					</div>
				);

				const textSide = (
					<div className="space-y-8">
						<Heading className="font-bold text-2xl">{title}</Heading>

						<HeadingLevel>
							{children}
							<div className="space-y-1">
								<div className="text-lg">Tech used</div>
								<ul className="flex flex-wrap gap-4">
									{tech.map(({ Icon, color, name }) => (
										<li key={name} className="flex items-center space-x-2">
											<Icon className={color} /> <span>{name}</span>
										</li>
									))}
								</ul>
							</div>
						</HeadingLevel>
					</div>
				);

				return (
					<React.Fragment key={title}>
						{index > 0 && <hr className="my-8" />}
						<AnimateOnScreen
							className="grid grid-cols-1 md:grid-cols-2 gap-8 transition duration-1000"
							idleClassName="opacity-0"
							intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
							onScreenClassName="translate-x-0 opacity-100"
							{...(index % 2 === 0
								? { offScreenClassName: '-translate-x-48 opacity-0' }
								: { offScreenClassName: 'translate-x-48 opacity-0' })}
						>
							{index % 2 === 0 ? (
								<>
									{imageSide}
									{textSide}
								</>
							) : (
								<>
									{textSide}
									{imageSide}
								</>
							)}
						</AnimateOnScreen>
					</React.Fragment>
				);
			})}
		</div>
	);
}

const projects: Array<{
	title: string;
	image: StaticImageData;
	tech: TechObject[];
	children: React.ReactNode;
	website?: string;
	github?: string;
}> = [
	{
		title: 'Finances',
		image: financesMockup,
		tech: [TechMap.React, TechMap.Next, TechMap.TypeScript, TechMap.Tailwind, TechMap.Mongo, TechMap.Node],
		children: (
			<div className="space-y-4">
				<p>
					My most recent side project is a personal finance tracking application. Instead of using a website like mint
					or Personal Capital, the purpose of this application is security.
				</p>

				<p>
					The user manually adds in accounts instead of linking to any financial instituations. Although it is tedious
					to manually enter financial information, there is no risk of malicious actors gaining senitive information in
					the case of a breach.
				</p>

				<p>
					This project is currently close-sourced with the intent of open-sourcing and launching it publicly in the
					future.
				</p>
			</div>
		),
	},
	{
		title: 'Pedestrian',
		image: pedxMockup,
		tech: [
			TechMap.React,
			TechMap.Next,
			TechMap.TypeScript,
			TechMap.StyledComponents,
			TechMap.Shopify,
			TechMap.GraphQL,
			TechMap.Node,
		],
		github: 'https://github.com/jas7457/pedx',
		website: 'https://pedx.vercel.app/',
		children: (
			<div className="space-y-4">
				<p>
					This is a shopping site for a local retailer called Pedestrian (or pedx) in my hometown. It uses most of my
					go-to tech stack.
				</p>

				<p>
					This project connects with the Shopify API. It uses their headless GraphQL API to query for products and
					create checkout workflows.
				</p>

				<p>
					This is an unfinished project, but showcases some of the finished pages in the application. Click the links on
					the right to view the code or the website.
				</p>
			</div>
		),
	},
];
