import {hostname} from 'os'
import {existsSync, readFileSync} from 'fs'
import {join} from 'path'
import * as Config from 'merge-config'

function subSetsRow(set: string[], size: number, index: number): any[] {

	if(0> size) return [[]];
	var rv = [];
	for(; index < set.length-size; ++index)
		rv.push(...subSetsRow(set, size-1, index+1).map(x=> [set[index]].concat(x)));
	return rv;
}

// ['a', 'b'] => [[], ['a'], ['b'], ['a', 'b']]
function subSets(set: string[]): string[][] {
	var rv = [[]];
	for(let i = 0; i < set.length; ++i)
		rv = rv.concat(subSetsRow(set, i, 0));
	return rv;
}

export default function extract(path: string = 'config', specs: string[] = [], env: string[] = null, argv: string[] = null) {
	var config = new Config(),
		roots = ['default', hostname(), 'local'],
		subSpecs = subSets(specs).map(x=>x.join('.')),
		extensions = ['yaml', 'yml', 'json'];
	//first static pass
	for(let root of roots) for(let subSpec of subSpecs) for(let extension of extensions) {
		let fName = join(path, [root, subSpec, extension].filter(x=>x).join('.'));
		if(existsSync(fName)) config.file(fName);
	}
	//second programatic pass
	for(let root of roots) for(let subSpec of subSpecs) {
		let fctName = [root, subSpec].filter(x=>x).join('.'),
			fName = join(path, fctName+'.js');
		if(existsSync(fName))
			eval(`[function _${fctName.replace(/\./g,'_')}(config){`+readFileSync(fName, 'utf8')+'}]')[0](config);
	}
	if(env) config.env(env);
	if(argv) config.argv(argv);
	return config.get();
}