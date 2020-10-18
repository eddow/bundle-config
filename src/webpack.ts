import * as webpack from "webpack"
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
	configured[options.name||'process.env.config'] = JSON.stringify(config);
	
	return new webpack.DefinePlugin(configured);
}
