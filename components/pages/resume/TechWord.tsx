import clsx from 'clsx';
import React, { useContext } from 'react';

import TechContext from '@app/context/TechContext';

import { TechObject } from './Tech';

export default function TechWord(props: TechWordProps) {
	const { children, tech } = props;
	const techContext = useContext(TechContext);

	return (
		<span className={clsx('font-mono', { 'font-bold text-primary-light': techContext[tech.name] })}>{children}</span>
	);
}

interface TechWordProps {
	children: string;
	tech: TechObject;
}
