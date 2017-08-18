///<reference path="../node_modules/fuse-box/dist/typings/core/WorkflowContext.d.ts" />
///<reference path="../node_modules/fuse-box/dist/typings/core/BundleProducer.d.ts" />
import {File} from 'fuse-box/dist/commonjs/core/File'
import {ModuleCollection} from 'fuse-box/dist/commonjs/core/ModuleCollection'
import extract from './config'

export interface ConfigPluginOptions {
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
	fileName: string = 'config.bundle-config.js'
	constructor(public opts: ConfigPluginOptions = {}) {
	}
	bundleStart(context: WorkFlowContext) {
		var bundleSpecs = context.bundle.name.split('/').concat([context.target]),
			config = extract(
				this.opts.path||'config',
				this.opts.specs ? bundleSpecs.concat(this.opts.specs) : bundleSpecs,
				this.opts.env, this.opts.argv
			),
			name = this.opts.name||'config',
			file = new File(context, {
				fuseBoxPath: this.fileName
			}),
			collection = new ModuleCollection(context, this.opts.name||'config');
		file.contents = 'module.exports = '+JSON.stringify(config)+';';
		collection.entryFile = file;
		context.source.createCollection(collection);
		context.source.startCollection(collection);
		context.source.addFile(file);
		context.source.endCollection(collection);
		//context.addAlias(this.opts.name||'config', '~/'+this.fileName);
	}
};

export const ConfigPlugin = (opts?: ConfigPluginOptions) => {
	return new ConfigPluginClass(opts || {});
};
