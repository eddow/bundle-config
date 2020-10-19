import extract from './config'
import ConfigPluginOption from './options'
import replace from '@rollup/plugin-replace';

export default function configPlugin(options: ConfigPluginOption = {})
{
	var config = extract(
			options.path||'config',
			options.specs || [],
			options.env,
			options.argv
		), configured = {};
	configured[options.name||'config'] = JSON.stringify(config);
	
	return replace(configured);
}