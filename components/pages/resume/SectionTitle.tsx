import React from 'react';

export default function SectionTitle(props: SectionTitleProps) {
	const { children } = props;

	return (
		<h3 className="text-2xl text-primary dark:text-opacity-75 mb-1">
			<span className="border-b-2 border-gray-300">{children}</span>
		</h3>
	);
}

interface SectionTitleProps {
	children: string;
}
