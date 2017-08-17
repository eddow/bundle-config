///<reference path="../node_modules/fuse-box/dist/typings/core/WorkflowContext.d.ts" />
///<reference path="../node_modules/fuse-box/dist/typings/core/BundleProducer.d.ts" />

export interface ConfigPluginOptions {
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

	}
	producerEnd(producer: BundleProducer) {
	}
};

export const ConfigPlugin = (opts?: ConfigPluginOptions) => {
	return new ConfigPluginClass(opts || {});
};
