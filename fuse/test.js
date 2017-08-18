
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");
const {ConfigPlugin} = require('../dist/fuse');

const fuse = FuseBox.init({
    homeDir: "..",
    output: "../test/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers()
		]
});

fuse
	.bundle("manual")
	.instructions('> [test/manual.ts]');

fuse
	.bundle("fused")
	.plugin(ConfigPlugin({
		path: 'test/config',
		specs: ['server', 'prod']
	}))
	.instructions('> [test/fused.ts]');

fuse.run();