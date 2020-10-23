import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default {
	input: 'src/index.ts',
	output: [{
		file: pkg.main,
		format: 'cjs',
		sourcemap: true
	}, {
		file: pkg.module,
		format: 'es',
		sourcemap: true
	}],
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {})
	],
	plugins: [
		resolve(),
		typescript(/*{
			typescript: require('typescript'),
			tsconfig: './src/tsconfig.json'
		}*/)
	]
}