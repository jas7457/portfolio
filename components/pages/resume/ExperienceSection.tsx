import React from 'react';

import TechList from './TechList';
import type { TechObject } from './Tech';

export default function ExperienceSection(props: ExperienceSectionProps) {
	const { children, positionTitle, location, company, startDate, endDate, techStack } = props;

	return (
		<section>
			<div className="flex justify-between">
				<h4 className="text-xl font-bold">{positionTitle}</h4>
				<span>{location}</span>
			</div>
			<div className="flex justify-between">
				<h5 className="font-semibold">{company}</h5>
				<span>{[startDate, endDate].map(formatDate).join(' - ')}</span>
			</div>

			<div className="my-2">{children}</div>

			<TechList techList={techStack} />
		</section>
	);
}

function formatDate(date: Date | undefined) {
	if (!date) {
		return 'Present';
	}

	return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

export interface ExperienceSectionProps {
	id: string;
	children: React.ReactNode;
	positionTitle: string;
	location: string;
	company: string;
	startDate: Date;
	endDate?: Date;
	techStack: TechObject[];
}
