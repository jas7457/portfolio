module.exports = {
	target: 'ie11',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: ['./**/*.tsx'],
	theme: {
		extend: {},
	},
};
