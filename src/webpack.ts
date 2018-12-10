import * as VModulePlugin from "vmodule-webpack-plugin"
import extract from './config'
import ConfigPluginOption from './options'

export default function configPlugin(options: ConfigPluginOption = {})
{
	var config = extract(
			options.path||'config',
			options.specs || [],
			options.env,
			options.argv
		), configured = {};
	return new VModulePlugin({
		name: options.name||'config',
		handler: ()=> config
	});
}
