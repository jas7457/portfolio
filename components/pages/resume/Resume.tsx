import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Header from './Header';
import ExperienceSection, { ExperienceSectionProps } from './ExperienceSection';
import SectionTitle from './SectionTitle';
import TechWord from './TechWord';
import TechnicalSkill from './TechnicalSkill';
import { TechMap, TechObject } from './Tech';
import TechContext from '@app/context/TechContext';

import useLocalStorage from '@app/hooks/useLocalStorage';

export default function Resume() {
	const router = useRouter();
	const isPDF = router.query.pdf === 'true';

	const [selectedTech, setSelectedTech] = useLocalStorage<Record<string, boolean>>('selectedTech', () => {
		return Object.keys(TechMap).reduce((memo, techName) => ({ ...memo, [techName]: false }), {});
	});

	const techWithSelection = useMemo(() => {
		return Object.values(TechMap).map((tech) => ({ ...tech, isSelected: selectedTech[tech.name] }));
	}, [selectedTech]);

	const onTechClick = (tech: TechObject) => {
		setSelectedTech({ ...selectedTech, [tech.name]: !selectedTech[tech.name] });
	};

	const filteredExperiences = experienceArray.filter((experience) =>
		techWithSelection
			.filter((t) => t.isSelected)
			.every((selectedTech) => experience.techStack.some((tech) => selectedTech.name === tech.name))
	);

	const onlyOneSelected = useMemo(
		() => techWithSelection.filter((tech) => tech.isSelected).length === 1,
		[techWithSelection]
	);

	return (
		<div
			className={clsx('mx-auto px-4', {
				container: !isPDF,
			})}
		>
			<Header isPDF={isPDF} />
			<TechContext.Provider value={selectedTech}>
				<main className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
					<div className="md:w-2/3 space-y-6">
						<section>
							<SectionTitle>Introduction</SectionTitle>
							<p>
								I am an engineering manager with extensive experience as a front end engineer. I am focused on
								developing feature-rich, responsive, and accessible web apps. I specialize in building{' '}
								<TechWord tech={TechMap.React}>React</TechWord> with{' '}
								<TechWord tech={TechMap.TypeScript}>TypeScript</TechWord>,{' '}
								<TechWord tech={TechMap.GraphQL}>GraphQL</TechWord>, and{' '}
								<TechWord tech={TechMap.Tailwind}>Tailwind CSS</TechWord> for the front end, and using{' '}
								<TechWord tech={TechMap.Node}>Node</TechWord> on the back end.
							</p>
						</section>

						<section>
							<SectionTitle>Experience</SectionTitle>
							{filteredExperiences.length === 0 ? (
								onlyOneSelected ? (
									<p>
										This particular technical skill may be used for personal projects, or not worth listing for a
										specific work experience. Try removing this filter to see more in the experience list.
									</p>
								) : (
									<p>
										No experiences with that filter combination. Try removing some Technical Skills to see more in the
										experinece list.
									</p>
								)
							) : (
								<div className="space-y-4">
									{filteredExperiences.map((experience) => (
										<ExperienceSection key={experience.id} {...experience} />
									))}
								</div>
							)}
						</section>
					</div>

					<div className="md:w-1/3 space-y-6">
						<section>
							<SectionTitle>Technical Skills</SectionTitle>
							<div className="space-y-4">
								<TechnicalSkill
									title="Languages"
									techList={Object.values(TechMap).filter((t) => t.type === 'language')}
									onTechClick={onTechClick}
								/>
								<TechnicalSkill
									title="Frameworks/Libraries"
									techList={Object.values(TechMap).filter((t) => t.type === 'framework')}
									onTechClick={onTechClick}
								/>
								<TechnicalSkill
									title="API/Database"
									techList={Object.values(TechMap).filter((t) => t.type === 'database')}
									onTechClick={onTechClick}
								/>
								<TechnicalSkill
									title="Software"
									techList={Object.values(TechMap).filter((t) => t.type === 'software')}
									onTechClick={onTechClick}
								/>
							</div>
						</section>
					</div>
				</main>
			</TechContext.Provider>
		</div>
	);
}

const experienceArray: ExperienceSectionProps[] = [
	{
		id: 'exp1',
		positionTitle: 'Engineering Manager',
		location: 'Pittsburgh, PA',
		company: 'Proofpoint / Thoma Bravo',
		startDate: new Date('4/1/2020'),
		techStack: [
			TechMap.React,
			TechMap.TypeScript,
			TechMap.JavaScript,
			TechMap.HTML,
			TechMap.Tailwind,
			TechMap.SASS,
			TechMap.CSS,
			TechMap.GraphQL,
			TechMap.Node,
			TechMap.Mongo,
			TechMap.Koa,
			TechMap.Hapi,
			TechMap.Jest,
			TechMap.Ember,
		],
		children: (
			<div className="space-y-2">
				<p>
					I manage a team of developers who are in charge of various parallel projects at Proofpoint. I plan,
					prioritize, and oversee all new features coming into our main feature line.
				</p>

				<ul className="list-disc pl-8 space-y-1">
					<li>
						I oversee and develop a greenfield project that consists of rewriting our legacy web app from the ground up
						in <TechWord tech={TechMap.React}>React</TechWord>.
					</li>
					<li>
						Work with the project managers to define requirements and use my knowledge of our framework, technology, and
						best practices to guide the process.
					</li>
					<li>
						Coordinate with our UX team to find repeating patterns or repetition and consolidate reusable components for
						a standard experience for our users.
					</li>
					<li>
						Rewrote our API layer from <TechWord tech={TechMap.Hapi}>Hapi</TechWord> to{' '}
						<TechWord tech={TechMap.Koa}>Koa</TechWord> due to <TechWord tech={TechMap.Hapi}>Hapi's</TechWord> upcoming
						end of life.
					</li>
				</ul>
			</div>
		),
	},
	{
		id: 'exp2',
		positionTitle: 'Senior Engineer and Team Lead',
		location: 'Pittsburgh, PA',
		company: 'Proofpoint',
		startDate: new Date('7/1/2019'),
		endDate: new Date('4/1/2020'),
		techStack: [
			TechMap.React,
			TechMap.TypeScript,
			TechMap.JavaScript,
			TechMap.HTML,
			TechMap.SASS,
			TechMap.CSS,
			TechMap.Node,
			TechMap.Backbone,
			TechMap.Marionette,
			TechMap.GitHub,
			TechMap.Jest,
			TechMap.Mocha,
		],
		children: (
			<div className="space-y-2">
				<p>
					I took the lead on converting our legacy web app from <TechWord tech={TechMap.Backbone}>Backbone</TechWord>{' '}
					and <TechWord tech={TechMap.Marionette}>Marionette</TechWord> to{' '}
					<TechWord tech={TechMap.React}>React</TechWord> for a new, large strategic initiative our company was taking.
					A proof-of-concept of how to integrate <TechWord tech={TechMap.React}>React</TechWord> into our stack has
					become one of our biggest differentiators in the market.
				</p>

				<ul className="list-disc pl-8 space-y-1">
					<li>
						I pushed for the adoption of more modern tools for a large proposal which was proving to be very difficult
						with our current tech stack.
					</li>
					<li>
						Leveraged <TechWord tech={TechMap.React}>React's</TechWord> ability to be adopted incrementally and started
						pulling in larger parts of our app into that ecosystem, ensuring to lazy-load pieces to keep bundle size
						small.
					</li>
					<li>
						Created duplicate components in <TechWord tech={TechMap.React}>React</TechWord> for every component in our
						codebase. These components shared styles and some functionality, but added the ability for end-user WYSIWYG
						edits of the content.
					</li>
					<li>
						Led the effort for keeping our code secure by integrating <TechWord tech={TechMap.GitHub}>GitHub</TechWord>{' '}
						Dependabot alerts and instituting once-a-quarter updates of all dependencies.
					</li>
				</ul>
			</div>
		),
	},
	{
		id: 'exp3',
		positionTitle: 'Junior Web Developer',
		location: 'Pittsburgh, PA',
		company: 'Wombat Security / Proofpoint',
		startDate: new Date('8/1/2014'),
		endDate: new Date('7/1/2019'),
		techStack: [
			TechMap.TypeScript,
			TechMap.JavaScript,
			TechMap.HTML,
			TechMap.SASS,
			TechMap.CSS,
			TechMap.Backbone,
			TechMap.Marionette,
			TechMap.JQuery,
			TechMap.Ember,
			TechMap.Mocha,
		],
		children: (
			<div className="space-y-2">
				<p>
					I focused heavily on growing my web development skills, with extra attention to detail on building responsive
					layouts, accessible 508-compliant pages, and interactive user experiences.
				</p>

				<ul className="list-disc pl-8 space-y-1">
					<li>
						Contributed heavily in migrating a <TechWord tech={TechMap.JQuery}>jQuery</TechWord> codebase into a{' '}
						<TechWord tech={TechMap.Backbone}>Backbone</TechWord> and{' '}
						<TechWord tech={TechMap.Marionette}>Marionette</TechWord> app, which was considered modern at the time.
					</li>
					<li>
						Created a way to mirror the layout of our entire enterprise app for right-to-left readers by creating{' '}
						<TechWord tech={TechMap.SASS}>sass</TechWord> mixins to create context-dependent css rules based on the
						current user locale.
					</li>
				</ul>
			</div>
		),
	},
];
