import { useContext } from 'react';

import DarkModeContext from '@app/context/DarkModeContext';

export default function useDarkMode() {
	return useContext(DarkModeContext)!;
}
