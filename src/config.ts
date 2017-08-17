import * as oh from 'os-hostname'
import {existsSync} from 'fs'
import {join} from 'path'
import * as Config from 'merge-config'

var ohp = new Promise((resolve, reject)=> {
	oh(function(err, hn) {
		return err ? reject(err) : resolve(hn);
	});
});

function subSetsRow(set, size, index): any[] {
	if(0> size) return [[]];
	var rv = [];
	for(; index < set.length-size; ++index)
		rv.push(...subSetsRow(set, size-1, index+1).map(x=> [set[index]].concat(x)));
	return rv;
}

function subSets(set) {
	var rv = [[]];
	for(let i = 0; i < set.length; ++i)
		rv = rv.concat(subSetsRow(set, i, 0));
	return rv;
}

export default async function extract(path, specs, env = null, argv = null) {
	var config = new Config({delimiter: '.'}),
		roots = ['default', await ohp, 'local'],
		subSpecs = subSets(specs).map(x=>x.join('.')),
		extensions = ['yaml', 'json'];
	for(let root of roots) for(let subSpec of subSpecs) for(let extension of extensions) {
		let fName = join(path, [root, subSpec, extension].filter(x=>x).join('.'));
		if(existsSync(fName)) config.file(fName);
	}
	if(env) config.env(env);
	if(argv) config.argv(argv);
	return config.get();
}