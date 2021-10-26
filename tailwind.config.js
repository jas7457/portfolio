// eslint-disable-next-line no-undef
module.exports = {
	purge: ['./**/*.tsx'],
	darkMode: 'class',
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				dark: '#1E1E1E',
			},
		},
	},
	plugins: [require('tailwindcss-interaction-variants')],
};
