import clsx from 'clsx';
import React, { useState } from 'react';

import AnimateOnScreen from '@app/components/AnimateOnScreen';

import { TechMap, TechObject } from '../resume/Tech';

export default function TechItems() {
	const [onScreen, setOnScreen] = useState(false);

	const showcaseList: Array<{ tech: TechObject }> = [
		{ tech: TechMap.React },
		{ tech: TechMap.Next },
		{ tech: TechMap.TypeScript },
		{ tech: TechMap.JavaScript },
		{ tech: TechMap.CSS },
		{ tech: TechMap.Tailwind },
		{ tech: TechMap.GraphQL },
		{ tech: TechMap.Node },
		{ tech: TechMap.Koa },
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
				{showcaseList.map(({ tech }) => (
					<li key={tech.name} className="relative flex">
						<div className={clsx('relative w-36 bg-primary-dark py-1 px-2 text-white')}>
							<div
								className={clsx(
									'flex items-center space-x-2 transition-opacity delay-1000 duration-1000',
									onScreen ? 'opacity-100' : 'opacity-0'
								)}
							>
								<tech.Icon />
								<span>{tech.name}</span>
							</div>
						</div>
						<div className="relative flex-grow bg-gray-300">
							<div
								className={clsx('absolute inset-0 bg-primary')}
								style={{
									width: `${onScreen ? 100 : 0}%`,
									transitionProperty: 'width',
									transitionDuration: '1s',
									transitionDelay: '1s',
									transitionTimingFunction: 'cubic-bezier(.08,.11,.4,.13)',
								}}
							></div>
						</div>
					</li>
				))}
			</ol>
		</AnimateOnScreen>
	);
}
