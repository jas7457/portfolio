import React from 'react';

export default function SectionTitle(props: SectionTitleProps) {
	const { children } = props;

	return (
		<h3 className="text-2xl text-blue-600 dark:text-blue-500 mb-1">
			<span className="border-b-2 border-gray-300">{children}</span>
		</h3>
	);
}

interface SectionTitleProps {
	children: string;
}
