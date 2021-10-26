import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.css';
import DarkModeContext from '../context/DarkModeContext';
import useLocalStorage from '../hooks/useLocalStorage';

export default function App({ Component, pageProps }: AppProps) {
	const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		setIsDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
		setShouldShow(true);
	}, [setIsDarkMode]);

	if (!shouldShow) {
		return null;
	}

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
