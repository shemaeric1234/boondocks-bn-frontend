/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const webpackMerge = require('webpack-merge');

const modeConfiguration = env => require(`./webpack/webpack.${env}`);
const commonConfig = require('./webpack/webpack.common');

module.exports = (
	{ mode } = {
		mode: 'development',
	},
) => webpackMerge(commonConfig, modeConfiguration(mode));
