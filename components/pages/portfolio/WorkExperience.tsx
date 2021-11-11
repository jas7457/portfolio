import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import AnimateOnScreen from '@app/components/AnimateOnScreen';
import experienceArray from '@app/consts/experienceArray';

import ExperienceSection from '../resume/ExperienceSection';

export default function WorkExperiece({ className }: { className?: string }) {
	return (
		<AnimateOnScreen
			className={clsx(className, 'space-y-8 transition duration-1000')}
			idleClassName="opacity-0"
			intersectionObserverOptions={{ rootMargin: '-75px 0px 0px 0px' }}
			onScreenClassName="translate-x-0 opacity-100"
			offScreenClassName="translate-x-48 opacity-0"
		>
			<p>
				I have 7+ years of professional front end engineering and management experience. I am looking to return to a
				more technical role, but can still utilizing my management skills to help for many positions. For a fuller
				picture, visit my{' '}
				<Link href="/resume">
					<a className="text-primary dark:text-primary-light">resume</a>
				</Link>{' '}
				page to view and download my current resume.
			</p>
			{experienceArray.map((experience) => (
				<ExperienceSection key={experience.id} {...experience} />
			))}
		</AnimateOnScreen>
	);
}
