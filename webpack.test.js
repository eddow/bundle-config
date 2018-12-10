var webpack = require("webpack"),
	path = require("path"),
//	{webpack: ConfigPlugin} = require('bundle-config');
	{webpack: ConfigPlugin} = require('./dist/config'),
	testPath = path.resolve(__dirname, 'test');

module.exports = {
	mode: 'development',	//This is meant to be bundled afterward anyway
	context: testPath,
	entry: {
		'webpacked': ['./bundled.ts'],
	},
	output: {
		filename: '[name].js',
		path: testPath
	},
	plugins: [
		new ConfigPlugin({
			path: 'test/config'
		})
	],
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'ts-loader'
		}]
	},
	resolve: {
		extensions: [".ts"]
	}
};