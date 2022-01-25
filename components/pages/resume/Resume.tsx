import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import experienceArray from '@app/consts/experienceArray';
import TechContext from '@app/context/TechContext';
import useLocalStorage from '@app/hooks/useLocalStorage';

import ExperienceSection from './ExperienceSection';
import Header from './Header';
import SectionTitle from './SectionTitle';
import { TechMap, TechObject } from './Tech';
import TechWord from './TechWord';
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
			className={clsx('mx-auto my-4 px-4', {
				container: !isPDF,
			})}
		>
			<Header isPDF={isPDF} />
			<TechContext.Provider value={selectedTech}>
				<main className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-10">
					<div className="space-y-6 md:w-2/3">
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

					<div className="space-y-6 md:w-1/3">
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
