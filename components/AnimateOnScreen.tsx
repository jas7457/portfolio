import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { PolymorphicAs } from '@app/types/utils';
import useOnScreen, { UseOnScreenOptions } from '@hooks/useOnScreen';

export default function AnimateOnScreen<TElement extends React.ElementType>({
	children,
	as,
	className,
	idleClassName,
	offScreenClassName,
	onScreenClassName,
	intersectionObserverOptions,
	onIntersection,
}: AnimateOnScreenProps<TElement>) {
	const ref = useRef<HTMLDivElement>(null);
	const onIntersectionRef = useRef(onIntersection);
	onIntersectionRef.current = onIntersection;

	const [phase, setPhase] = useState<'initial' | 'transition-start' | 'transition-end'>('initial');
	const onScreen = useOnScreen(ref, intersectionObserverOptions);

	useEffect(() => {
		if (!onScreen) {
			return;
		}

		if (phase === 'initial') {
			setPhase('transition-start');
			setTimeout(() => setPhase('transition-end'), 300);
		}
	}, [onScreen, phase]);

	useEffect(() => {
		if (onScreen) {
			onIntersectionRef.current?.();
		}
	}, [onScreen]);

	const classes = (() => {
		switch (phase) {
			case 'initial':
				return idleClassName;
			case 'transition-start':
				return offScreenClassName;
			case 'transition-end':
				return onScreenClassName;
		}
	})();

	const Component = as || 'div';

	return (
		<Component ref={ref} className={clsx(className, classes)}>
			{children}
		</Component>
	);
}

type AnimateOnScreenProps<TElement extends React.ElementType> = {
	children: React.ReactNode;
	className?: string;
	idleClassName?: string;
	offScreenClassName?: string;
	onScreenClassName?: string;
	intersectionObserverOptions?: UseOnScreenOptions;
	onIntersection?: () => void;
} & PolymorphicAs<TElement>;
