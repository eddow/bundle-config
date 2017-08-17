
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: ".",
    output: "test/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers()
		]
});

fuse
	.bundle("config")
	.instructions('> [test/config.ts]');

fuse.run();