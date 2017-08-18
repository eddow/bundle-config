
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "../src",
    output: "../dist/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers()
		]
});

fuse
	.bundle("query-hostname")
	.instructions('> query-hostname.js');

fuse.run();