
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "../src",
    output: "../dist/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers(),
			QuantumPlugin({
				bakeApiIntoBundle: 'fuse',
				containedAPI: true,
				target: 'npm'
			})
		],
		package: {
			name: "fuse",
			main: 'index.ts'
		},
		globals: {
			'fuse': '*'
		}
});

fuse
	.bundle("fuse")
	.instructions('> [fuse-box.ts]');

fuse.run();