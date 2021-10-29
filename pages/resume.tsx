import Head from 'next/head';
import React from 'react';

import Resume from '@app/components/pages/resume/Resume';

export default function ResumePage() {
	return (
		<>
			<Head>
				<title>Jason Addleman's Resume</title>
				<meta
					name="description"
					content="Jason Addleman's Resume: A Front End Engineer focused on React and TypeScript"
				/>
			</Head>
			<Resume />
		</>
	);
}
