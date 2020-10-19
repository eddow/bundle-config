import typescript from 'rollup-plugin-typescript2'
const {rollup: ConfigPlugin} = require('../dist')

export default {
	input: './test/index.ts',
	output: [{
		file: './test/rolledup.js',
		format: 'cjs'
	}],
	external: [
		'./node_modules'
	],
	plugins: [
		typescript({
			typescript: require('typescript'),
			tsconfig: './test/tsconfig.json'
		}),
		ConfigPlugin({path: './test/config'})
	]
}