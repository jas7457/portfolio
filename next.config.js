module.exports = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/resume',
				permanent: false,
			},
		];
	},
};
