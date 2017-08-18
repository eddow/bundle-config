///<reference path="../node_modules/fuse-box/dist/typings/core/WorkflowContext.d.ts" />
///<reference path="../node_modules/fuse-box/dist/typings/core/BundleProducer.d.ts" />

import extract from './config'

export interface ConfigPluginOptions {
	importName?: string
	path?: string
	specs?: string[]
	env?: string[]
	argv?: string[]
	name?: string
}
export class ConfigPluginClass implements Plugin {
	/*readonly description: string;
	readonly filename: string;
	readonly length: number;
	readonly name: string;
	readonly version: string;
	item(index: number): MimeType;
	namedItem(type: string): MimeType;
	[index: number]: MimeType;*/
	constructor(public opts?: ConfigPluginOptions) {
		if(!opts.path) opts.path = 'config';
		if(!opts.specs) opts.specs = [];
	}
	bundleStart(context: WorkFlowContext) {
		var bundleSpecs = context.bundle.name.split('/'),
			config = extract(
				this.opts.path||'config',
				this.opts.specs ? bundleSpecs.concat(this.opts.specs) : bundleSpecs,
				this.opts.env, this.opts.argv
			),
			tempFileName = './config.'+Math.floor(Math.random()*Math.pow(36,11)).toString(36)+'.js';
		context.output.write(tempFileName, 'module.exports = '+JSON.stringify(config)+';', true);
		context.addAlias(this.opts.importName||'config', tempFileName);
	}
};

export const ConfigPlugin = (opts?: ConfigPluginOptions) => {
	return new ConfigPluginClass(opts || {});
};
