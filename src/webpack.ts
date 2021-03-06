import extract from './config'
import ConfigPluginOption from './options'

export default function configPlugin(options: ConfigPluginOption = {})
{
	const webpack = require('webpack');
	debugger;
	var config = extract(
			options.path||'config',
			options.specs || [],
			options.env,
			options.argv
		), configured = {};
	configured[options.name||'config'] = JSON.stringify(config);
	
	return new webpack.DefinePlugin(configured);
}