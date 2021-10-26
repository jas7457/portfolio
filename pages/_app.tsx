import React, { useLayoutEffect } from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.css';
import DarkModeContext from '../context/DarkModeContext';
import useLocalStorage from '../hooks/useLocalStorage';

export default function App({ Component, pageProps }: AppProps) {
	const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

	useLayoutEffect(() => {
		setIsDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
	}, [setIsDarkMode]);

	return (
		<DarkModeContext.Provider value={[isDarkMode, setIsDarkMode]}>
			<div className={isDarkMode ? 'dark' : undefined}>
				<div className="dark:bg-dark transition-colors duration-500">
					<Component {...pageProps} />
				</div>
			</div>
		</DarkModeContext.Provider>
	);
}
