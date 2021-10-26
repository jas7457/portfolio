import React from 'react';
import Head from 'next/head';

import Portfolio from '@app/components/pages/portfolio/Portfolio';

export default function IndexPage() {
	return (
		<>
			<Head>
				<title>Jason Addleman's Portfolio</title>
				<meta
					name="description"
					content="Jason Addleman's Portfolio: A Front End Engineer focused on React and TypeScript"
				/>
			</Head>
			<Portfolio />
		</>
	);
}
