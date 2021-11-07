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
						<div className="flex-grow bg-gray-300 relative">
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
