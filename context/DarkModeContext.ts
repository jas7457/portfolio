import React, { Dispatch, SetStateAction } from 'react';

const DarkModeContext = React.createContext<[boolean, Dispatch<SetStateAction<boolean>>] | null>(null);

export default DarkModeContext;
