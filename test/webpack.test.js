var webpack = require("webpack"),
	path = require("path"),
//	{webpack: ConfigPlugin} = require('bundle-config');
	{webpack: ConfigPlugin} = require('../dist'),
	testPath = __dirname;

module.exports = {
	mode: 'development',
	context: testPath,
	entry: {
		'webpacked': ['./index.ts'],
	},
	output: {
		filename: '[name].js',
		path: testPath
	},
	plugins: [
		new ConfigPlugin({path: './test/config', specs: ['client', 'dev']})
	],
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'ts-loader'
		}, {
			test: /\.json$/,
			loader: 'json-loader'
		}]
	},
	resolve: {
		extensions: ['.ts', '.json']
	}
};