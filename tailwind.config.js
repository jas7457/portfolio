const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./**/*.tsx'],
	darkMode: 'class',
	mode: 'jit',
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
		},
	},
	plugins: [require('tailwindcss-interaction-variants')],
};
