
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");
//const {fuse: ConfigPlugin} = require('bundle-config');
const {fuse: ConfigPlugin} = require('../dist/config');

const fuse = FuseBox.init({
    homeDir: "..",
    output: "../test/$name.js",
		cache: false,
		sourceMaps: false,
		debug: true,
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
	.instructions('> [test/bundled.ts]');

fuse.run();