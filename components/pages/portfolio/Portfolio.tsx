import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { MdAlternateEmail, MdPhoneIphone } from 'react-icons/md';
import { SiGithub, SiLinkedin } from 'react-icons/si';

import AnimateOnScreen from '@app/components/AnimateOnScreen';
import Heading, { HeadingLevel } from '@app/components/Heading';

import Beliefs from './Beliefs';
import Hero from './Hero';
import Projects from './Projects';
import TechItems from './TechItems';
import WorkExperiece from './WorkExperience';

export default function Portfolio() {
	return (
		<>
			<header>
				<Hero />
			</header>

			<main className="my-12 space-y-24">
				<section>
					<Container>
						<Title>About Me</Title>
						<HeadingLevel>
							<div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
								<AnimateOnScreen
									className="space-y-4 text-center transition duration-1000"
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
									<Heading className="text-3xl font-medium text-dark">Who am I?</Heading>
									<p>
										I'm an engineering manager and senior front end developer based in Pittsburgh, Pennsylvania. I have
										a passion for modern technology, working and learning with others, and bringing UX interactions to
										life.
									</p>

									<p>
										I'm currently looking for a role that utilizes React, TypeScript, utility css (Tailwind, for
										example), GraphQL, and Node.
									</p>

									<p>
										Interested in working together? View my{' '}
										<Link href="/resume">
											<a className="text-primary dark:text-primary-light">resume</a>
										</Link>
										, download a{' '}
										<a className="text-primary dark:text-primary-light" href="/JasonAddlemanResume.pdf" download>
											copy
										</a>
										, or connect over{' '}
										<a className="text-primary dark:text-primary-light" href="mailto:jas7457@gmail.com">
											email
										</a>{' '}
										or{' '}
										<a className="text-primary dark:text-primary-light" href="tel:+7176584499">
											phone!
										</a>
									</p>
								</AnimateOnScreen>

								<TechItems />
							</div>
						</HeadingLevel>
					</Container>
				</section>

				<section>
					<Container>
						<Title>What I Believe</Title>
						<HeadingLevel>
							<Beliefs />
						</HeadingLevel>
					</Container>
				</section>

				<section>
					<Container>
						<Title>Work Experience</Title>
						<HeadingLevel>
							<WorkExperiece />
						</HeadingLevel>
					</Container>
				</section>

				<section>
					<Container>
						<Title>Projects</Title>
						<HeadingLevel>
							<Projects />
						</HeadingLevel>
					</Container>
				</section>
			</main>

			<footer className="relative flex flex-col items-center space-y-2 bg-gray-800 py-8 text-gray-400">
				<button
					aria-label="Back to top"
					className="focus-visible:outline-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hocus:scale-110"
					onClick={() => {
						window.scrollTo({
							behavior: 'smooth',
							top: 0,
							left: 0,
						});
					}}
				>
					<div className="absolute inset-1 h-3/4 w-3/4 rounded-full bg-white"></div>
					<BsArrowUpCircleFill className="relative z-10 text-3xl text-primary" />
				</button>
				<div className="space-x-2 font-thin">
					<span>Jason Addleman</span>
					<span className="animate-pulse">/</span>
					<span>©&nbsp;{new Date().getFullYear()}</span>
				</div>

				<div className="flex space-x-2">
					{[
						{
							title: 'LinkedIn',
							href: 'https://www.linkedin.com/in/jason-addleman-91544997/',
							classes: 'hocus:text-tech-linkedin',
							Icon: SiLinkedin,
							blankTarget: true,
						},
						{
							title: 'Github',
							href: 'https://github.com/jas7457',
							classes: 'hocus:text-white',
							Icon: SiGithub,
							blankTarget: true,
						},
						{
							title: 'Email',
							href: 'mailto:jas7457@gmail.com',
							classes: 'hocus:text-tech-html',
							Icon: MdAlternateEmail,
							blankTarget: false,
						},
						{
							title: 'Phone',
							href: 'tel:+7176584499',
							classes: 'hocus:text-tech-node',
							Icon: MdPhoneIphone,
							blankTarget: false,
						},
					].map(({ href, title, classes, blankTarget, Icon }, index) => {
						return (
							<a
								key={index}
								href={href}
								className={clsx('focus:outline-none transition-transform hocus:scale-110', classes)}
								title={title}
								{...(blankTarget && { target: '_blank', rel: 'noopener noreferrer' })}
							>
								<Icon />
							</a>
						);
					})}
				</div>
			</footer>
		</>
	);
}

function Container({ children }: { children: React.ReactNode }) {
	return <div className="mx-auto w-full max-w-7xl px-8">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center">
			<Heading className="mb-8 flex flex-col items-center text-6xl font-light uppercase text-gray-700 dark:text-gray-400">
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
					className="w-4/5 transition duration-500"
					idleClassName="opacity-0"
					offScreenClassName="translate-x-32 opacity-0"
					onScreenClassName="translate-x-0 opacity-100"
					intersectionObserverOptions={{ threshold: 0.5, rootMargin: '-50px 0px 0px 0px' }}
				>
					<div className="mt-3 w-full border-b-2 border-current" />
				</AnimateOnScreen>
			</Heading>
		</div>
	);
}
