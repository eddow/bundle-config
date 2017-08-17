
const {FuseBox, TypeScriptHelpers, QuantumPlugin} = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
		cache: false,
		sourceMaps: false,
		plugins: [
			TypeScriptHelpers()
		]
});

fuse
	.bundle("config-plugin")/*
	.plugin(
		QuantumPlugin({
			bakeApiIntoBundle: 'config-plugin',
			containedAPI: true,
			target: 'npm'
		}))*/
	.instructions('> [plugins.ts]');

fuse
	.bundle("query-hostname")/*
	.plugin(
		QuantumPlugin({
			target: 'server'
		}))*/
	.instructions('> query-hostname.js');

fuse.run();