import React from 'react';
import Document, { Main, NextScript, Html, Head } from 'next/document';

export default class MyDocument extends Document {
	public render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
