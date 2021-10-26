import React from 'react';
import Head from 'next/head';

import Resume from '../components/pages/resume/Resume';

export default function ResumePage() {
	return (
		<>
			<Head>
				<title>Jason Addleman's Resume</title>
				<meta
					name="description"
					content="Jason Addleman's resume: A Senior Front End Developer focused on React and TypeScript"
				/>
			</Head>
			<Resume />
		</>
	);
}
