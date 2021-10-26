import React, { useContext } from 'react';
import clsx from 'clsx';

import type { TechObject } from './Tech';
import TechContext from '../../../context/TechContext';
import { getTechClasses } from './Tech';

export default function TechnicalSkill(props: TechnicalSkillProps) {
	const { title, techList, onTechClick } = props;

	const techContext = useContext(TechContext);

	return (
		<div>
			<h4 className="font-bold text-lg">{title}</h4>
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
										: 'border-gray-400 dark:border-gray-600 shadow hover:bg-gray-700 dark:hocus:bg-gray-200 hocus:text-white dark:hocus:text-gray-800 hocus:border-transparent'
								)}
								onClick={() => onTechClick(tech)}
							>
								<Icon color={tech.color} className="mr-1" /> {tech.name}
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
