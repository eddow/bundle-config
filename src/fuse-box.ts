///<reference path="../node_modules/fuse-box/dist/typings/core/WorkflowContext.d.ts" />
///<reference path="../node_modules/fuse-box/dist/typings/core/BundleProducer.d.ts" />
import {File} from 'fuse-box/dist/commonjs/core/File'
import {ModuleCollection} from 'fuse-box/dist/commonjs/core/ModuleCollection'
import {BundleData} from 'fuse-box/dist/commonjs/arithmetic/Arithmetic.js'
import extract from './config'

export interface ConfigPluginOptions {
	path?: string
	specs?: string[]
	env?: string[]
	argv?: string[]
	name?: string
}

var virtualName: string = 'config.bundle-config.js';
var _fileBlackListed = BundleData.prototype.fileBlackListed;
BundleData.prototype.fileBlackListed = function(file) {
	return virtualName === file.relativePath || _fileBlackListed.call(this, file);
};
export class ConfigPluginClass implements Plugin {
	/*readonly description: string;
	readonly filename: string;
	readonly length: number;
	readonly name: string;
	readonly version: string;
	item(index: number): MimeType;
	namedItem(type: string): MimeType;
	[index: number]: MimeType;*/
	constructor(public opts: ConfigPluginOptions = {}) {
	}
	
	init(context: WorkFlowContext) {
		var _startCollection = context.source.startCollection;
		context.source.startCollection = collection=> {
			_startCollection.call(context.source, collection);
			if(collection.name === context.defaultPackageName) {
				context.source.addFile(this.configFile(context));
			}
		};
		context.addAlias(this.opts.name||'config', '~/'+virtualName);
	}
	configFile(context: WorkFlowContext) : File {
		var bundleSpecs = context.bundle.name.split('/').concat([context.target]),
			config = extract(
				this.opts.path||'config',
				this.opts.specs ? bundleSpecs.concat(this.opts.specs) : bundleSpecs,
				this.opts.env, this.opts.argv
			),
			file = new File(context, {
				fuseBoxPath: virtualName
			});
		file.contents = 'module.exports = '+JSON.stringify(config)+';';
		return file;
	}
};

export const ConfigPlugin = (opts?: ConfigPluginOptions) => {
	return new ConfigPluginClass(opts || {});
};
