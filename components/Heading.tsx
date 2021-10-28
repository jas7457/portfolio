import React, { useContext } from 'react';
import clsx from 'clsx';

import HeadingContext from '@app/context/HeadingContext';

/**
 * A component to automatically figure out the correct heading level based on React Context
 */
export default function Heading({ children, className, ...rest }: HeadingProps) {
	const headingLevel = useContext(HeadingContext);
	const HeadingComponent = `h${headingLevel}` as const;

	return (
		<HeadingComponent data-component="heading" className={clsx(className)} {...rest}>
			{children}
		</HeadingComponent>
	);
}

/**
 * Wrap this around a component that you want to introduce a new heading level scope to
 * All <Heading> components inside will be rendered heading level + 1 inside of it
 */
export function HeadingLevel({ children }: { children: React.ReactNode }) {
	const currentLevel = useContext(HeadingContext);
	const nextLevel = Math.min(6, currentLevel + 1) as 1 | 2 | 3 | 4 | 5 | 6;

	return <HeadingContext.Provider value={nextLevel}>{children}</HeadingContext.Provider>;
}

export interface HeadingProps extends React.PropsWithoutRef<JSX.IntrinsicElements['h1']> {
	children: React.ReactNode;
}
