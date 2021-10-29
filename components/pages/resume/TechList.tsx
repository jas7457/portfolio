import clsx from 'clsx';
import React, { useContext } from 'react';

import TechContext from '@app/context/TechContext';

import Tech, { TechObject } from './Tech';

export default function TechList(props: TechListProps) {
	const { techList } = props;

	const techContext = useContext(TechContext);
	const oneSelected = Object.values(techContext).some((selected) => selected);

	return (
		<ul className="flex flex-wrap">
			{techList.map((tech) => {
				const isSelected = techContext[tech.name];
				const { color, textColor } = (() => {
					if (!oneSelected || isSelected) {
						return { color: tech.color, textColor: undefined };
					}
					return { color: undefined, textColor: 'text-gray-500' };
				})();

				return (
					<li key={tech.name} className={clsx('m-1', textColor)}>
						<Tech {...tech} color={color} iconClassName={textColor} isSelected={isSelected} />
					</li>
				);
			})}
		</ul>
	);
}

interface TechListProps {
	techList: TechObject[];
}
