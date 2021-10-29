const path = require('path');

const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
	reactStrictMode: true,
	include: path.resolve(__dirname, 'assets/svg'),
	webpack(config) {
		return config;
	},
});
