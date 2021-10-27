import React, { useEffect, useState } from 'react';

export default function useOnScreen<TElement extends HTMLElement>(
	ref: React.RefObject<TElement>,
	options: UseOnScreenOptions = {}
) {
	const [isIntersecting, setIntersecting] = useState(false);
	const { run = 'single' } = options;

	useEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
			if (entry.isIntersecting && run === 'single') {
				observer.unobserve(element);
			}
		}, options);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [ref, options, run]);

	return isIntersecting;
}

export type UseOnScreenOptions = IntersectionObserverInit & { run?: 'single' | 'continuous' };
