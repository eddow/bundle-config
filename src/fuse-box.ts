///<reference path="../node_modules/fuse-box/dist/typings/core/WorkflowContext.d.ts" />
///<reference path="../node_modules/fuse-box/dist/typings/core/BundleProducer.d.ts" />
import {File} from 'fuse-box/dist/commonjs/core/File'
import {ModuleCollection} from 'fuse-box/dist/commonjs/core/ModuleCollection'
import {BundleData} from 'fuse-box/dist/commonjs/arithmetic/Arithmetic.js'
import extract from './config'
import ConfigPluginOption from './options'

var virtualName: string = 'config.bundle-config.js',
	configTest = new RegExp(virtualName.replace(/\./g, '\\.')+'$');
var _fileBlackListed = BundleData.prototype.fileBlackListed;
BundleData.prototype.fileBlackListed = function(file) {
	return configTest.test(file.relativePath) || _fileBlackListed.call(this, file);
};
export class ConfigPluginClass implements Plugin {
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

export default (opts?: ConfigPluginOptions) => new ConfigPluginClass(opts || {});
