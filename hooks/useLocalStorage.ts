import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useLocalStorage<T>(
	key: string,
	init: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, boolean] {
	const [state, setState] = useState(init);
	const [wasLoaded, setWasLoaded] = useState(false);

	// in an effect so we ensure we're on the client, not on the server
	useEffect(() => {
		setWasLoaded(true);

		try {
			const val = localStorage.getItem(key);
			if (val !== null) {
				setState(JSON.parse(val));
			}
		} catch (e) {}
	}, [key]);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState, wasLoaded];
}
