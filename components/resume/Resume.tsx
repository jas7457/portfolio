import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Header from './Header';
import ExperienceSection, { ExperienceSectionProps } from './ExperienceSection';
import SectionTitle from './SectionTitle';
import TechWord from './TechWord';
import TechContext from '../../context/TechContext';
import { TechMap, TechObject } from './Tech';

import useLocalStorage from '../../hooks/useLocalStorage';
import TechnicalSkill from './TechnicalSkill';

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

	return (
		<div className={clsx('mx-auto px-4 text-gray-900', { container: !isPDF })}>
			<Header />
			<TechContext.Provider value={selectedTech}>
				<main className="space-y-6 md:flex md:space-y-0 md:space-x-10">
					<div className="md:w-2/3 space-y-6">
						<section>
							<SectionTitle>Introduction</SectionTitle>
							<p>
								I am an engineering manager with a background as a full-stack developer. I have a focus on developing
								feature-rich, responsive, and accessible web apps. I specialize in building{' '}
								<TechWord tech={TechMap.React}>React</TechWord> apps for the front end, and using{' '}
								<TechWord tech={TechMap.Node}>Node</TechWord> for the back end.
							</p>
						</section>

						<section>
							<SectionTitle>Experience</SectionTitle>
							<div className="space-y-4">
								{experienceArray
									.filter((experience) => {
										return techWithSelection
											.filter((t) => t.isSelected)
											.every((selectedTech) => {
												return experience.techStack.some((tech) => selectedTech.name === tech.name);
											});
									})
									.map((experience) => (
										<ExperienceSection key={experience.id} {...experience} />
									))}
							</div>
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

			{!isPDF && (
				<Link href="/api/downloadResume">
					<a>Download resume</a>
				</Link>
			)}
		</div>
	);
}

const experienceArray: ExperienceSectionProps[] = [
	{
		id: 'exp1',
		positionTitle: 'Engineering Manager',
		location: 'Pittsburgh, PA',
		company: 'Proofpoint',
		startDate: new Date('4/1/2020'),
		techStack: [
			TechMap.React,
			TechMap.JavaScript,
			TechMap.TypeScript,
			TechMap.HTML,
			TechMap.Node,
			TechMap.CSS,
			TechMap.Mongo,
			TechMap.Koa,
		],
		children: (
			<div className="space-y-2">
				<p>
					I manage a team of four developers who are in charge of various parallel projects at Proofpoint. I plan,
					prioritize, and oversee all new features coming into our main feature line.
				</p>

				<ul className="list-disc pl-8 space-y-1">
					<li>
						I plan, oversee, and develop a greenfield project that consists of rewriting our legacy web app from the
						ground up in <TechWord tech={TechMap.React}>React</TechWord>.
					</li>
					<li>Pair with my developers when they are stuck, or general mentoring</li>
					<li>
						Work with the project managers to define requirements and use my knowledge of our framework and the
						technology we use to guide the process.
					</li>
					<li>
						Coordinate with our UX team to find repeating patterns or repetition and consolidate reusable components for
						a standard experience for our users
					</li>
				</ul>
			</div>
		),
	},
	{
		id: 'exp2',
		positionTitle: 'Graduate Teaching Assistant',
		location: 'Philadelphia, PA',
		company: 'Drexel University - LeBow College of Business',
		startDate: new Date(),
		techStack: [TechMap.TypeScript, TechMap.JavaScript],
		children: (
			<>
				<p>
					TA'd three sections of graduate-level Multivariate Analysis class (STAT 630) by leading office hours and
					grading problem sets/case studies on various topics (PCA, Factor Analysis, LDA, Logistic Regression, Decision
					Trees/Random Forest, KNN and hierarchical clustering) for 60+ grad students.
				</p>
			</>
		),
	},
];
