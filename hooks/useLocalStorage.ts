import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useLocalStorage<T>(key: string, init: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState(init);

	// in an effect so we ensure we're on the client, not on the server
	useEffect(() => {
		try {
			const val = localStorage.getItem(key);
			if (val !== null) {
				setState(JSON.parse(val));
			}
		} catch (e) {}
	}, [key]);

	return [
		state,
		(val) => {
			setState(val);
			try {
				localStorage.setItem(key, JSON.stringify(val));
			} catch (e) {}
		},
	];
}
