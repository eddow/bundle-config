
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "../src",
    output: "../dist/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers(),
			QuantumPlugin({
				bakeApiIntoBundle: 'config',
				containedAPI: true,
				target: 'npm'
			})
		],
		package: {
			name: "config",
			main: 'index.ts'
		},
		globals: {
			'config': '*'
		}
});

fuse
	.bundle("config")
	.instructions('> [config.ts]');

fuse.run();