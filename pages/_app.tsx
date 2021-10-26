import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import '../styles/index.css';
import DarkModeContext from '@app/context/DarkModeContext';
import useLocalStorage from '@app/hooks/useLocalStorage';

export default function App({ Component, pageProps }: AppProps) {
	const [isDarkMode, setIsDarkMode, wasLoaded] = useLocalStorage<boolean>('darkMode', undefined!);
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		if (!wasLoaded) {
			return;
		}

		if (isDarkMode === undefined) {
			setIsDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
		}

		setShouldShow(true);
	}, [setIsDarkMode, wasLoaded, isDarkMode]);

	if (!shouldShow) {
		return null;
	}

	return (
		<DarkModeContext.Provider value={[isDarkMode, setIsDarkMode]}>
			<div className={isDarkMode ? 'dark' : undefined}>
				<div className="text-text dark:text-dark-text dark:bg-dark transition-colors duration-500">
					<Component {...pageProps} />
				</div>
			</div>
		</DarkModeContext.Provider>
	);
}
