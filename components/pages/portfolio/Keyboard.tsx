import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Keyboard.module.css';

const TIME_TO_TYPE = 1500;
const TIME_TO_DELETE = 1000;

export default function Keyboard({ words }: { words: string[] }) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentlyTyped, setCurrentlyTyped] = useState('');
	const [action, setAction] = useState<'type' | 'delete'>('type');

	const currentWord = words[currentWordIndex];

	useEffect(() => {
		const typeTimeout = TIME_TO_TYPE / currentWord.length;
		const deleteTimeout = TIME_TO_DELETE / currentWord.length;

		if (action === 'type') {
			if (currentlyTyped === currentWord) {
				const next = setTimeout(() => {
					setAction('delete');
				}, 3000);
				return () => clearTimeout(next);
			}

			const next = setTimeout(() => {
				setCurrentlyTyped(currentlyTyped + currentWord[currentlyTyped.length]);
			}, typeTimeout);

			return () => clearTimeout(next);
		}

		if (action === 'delete') {
			if (currentlyTyped.length === 0) {
				const next = setTimeout(() => {
					const nextWordIndex = currentWordIndex + 1 === words.length ? 0 : currentWordIndex + 1;
					setCurrentWordIndex(nextWordIndex);
					setAction('type');
				}, 1000);

				return () => clearTimeout(next);
			}

			const next = setTimeout(() => {
				setCurrentlyTyped(currentlyTyped.slice(0, -1));
			}, deleteTimeout);
			return () => clearTimeout(next);
		}
	}, [action, currentlyTyped, currentWord, currentWordIndex, words.length]);

	return <span className={clsx(styles.keyboard, 'relative')}>{currentlyTyped}</span>;
}
