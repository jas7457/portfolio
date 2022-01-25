import clsx from 'clsx';
import React, { useContext } from 'react';

import TechContext from '@app/context/TechContext';

import { getTechClasses } from './Tech';

import type { TechObject } from './Tech';

export default function TechnicalSkill(props: TechnicalSkillProps) {
	const { title, techList, onTechClick } = props;

	const techContext = useContext(TechContext);

	return (
		<div data-component="technical-skill">
			<h4 className="text-lg font-bold">{title}</h4>
			<ul className="flex flex-wrap">
				{techList.map((tech) => {
					const Icon = tech.Icon;
					const isSelected = techContext[tech.name];

					return (
						<li key={tech.name} className="mx-1 my-1">
							<button
								key={tech.name}
								className={clsx(
									getTechClasses(isSelected),
									'outline-none focus:outline-none focus:shadow-outline px-5',
									isSelected
										? 'border-transparent'
										: 'border-gray-400 shadow hocus:border-transparent hocus:bg-gray-700 hocus:text-white dark:border-gray-600 dark:hocus:bg-gray-200 dark:hocus:text-gray-800'
								)}
								onClick={() => onTechClick(tech)}
							>
								<Icon className={clsx('mr-1', tech.color)} /> {tech.name}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

interface TechnicalSkillProps {
	title: string;
	techList: Array<TechObject>;
	onTechClick: (item: TechnicalSkillProps['techList'][number]) => void;
}
