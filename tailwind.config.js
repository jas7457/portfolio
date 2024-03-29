const interactionVariantPlugin = require('tailwindcss-interaction-variants');
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./**/*.tsx'],
	darkMode: 'class',
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#fff',
			black: '#000',
			gray: colors.gray,
			dark: '#1E1E1E',
			primary: {
				light: colors.blue[300],
				DEFAULT: colors.blue[600],
				dark: colors.blue[800],
			},
			text: colors.gray[900],
			'dark-text': colors.gray[200],
			tech: {
				typescript: '#2d79c7',
				javascript: '#efd81d',
				html: '#dd4b25',
				css: '#1a6fb4',
				scss: '#c76494',
				node: '#6ea55f',
				react: '#5ed3f3',
				next: '#000',
				tailwind: '#14b4c6',
				jest: '#944058',
				mocha: '#866041',
				ember: '#0466aa',
				jquery: '#0466aa',
				backbone: '#0071b5',
				marionette: '#ce2227',
				graphql: '#E535AB',
				koa: '#000',
				express: '#000',
				hapi: '#ee9021',
				mongo: '#50a64a',
				git: '#eb4d28',
				github: '#1a1e22',
				webstorm: '#1a1e22',
				vscode: '#497BB8',
				jenkins: '#cc3631',
				jira: '#2580f7',
				confluence: '#2680f5',
				twitter: '#1d9bf0',
				styledcomponents: '#fb9be2',
				shopify: '#95bf47',
				linkedin: '#0077b5',
			},
		},
	},
	plugins: [interactionVariantPlugin],
};
