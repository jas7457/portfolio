import clsx from 'clsx';
import React from 'react';
import { CgDarkMode } from 'react-icons/cg';

import useDarkMode from '@app/hooks/useDarkMode';

export default function DarkModeButton() {
	const [isDarkMode, setIsDarkMode] = useDarkMode();

	return (
		<button className={'inline-flex items-center'} onClick={() => setIsDarkMode((currentDarkMode) => !currentDarkMode)}>
			<CgDarkMode className={clsx('mr-2 transform duration-500', { 'rotate-180': isDarkMode })} />{' '}
			{isDarkMode ? 'Light Mode' : 'Dark Mode'}
		</button>
	);
}
