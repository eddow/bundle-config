[![npm](https://img.shields.io/npm/v/bundle-config.svg)](https://www.npmjs.com/package/bundle-config)
# Bundle config
Inteded to be used by bundlers to bundle a configuration object built upon many selected files - easing developing, testing, etc.

## Config gathering
The gathering will create one configuration object from the files of a folder and the configuration given as parameter.

The configuration engine will look for many files each overwriting the previous one.
Each file will be searched with extension `.yaml` or `.json`. Note that it will read [hjson](http://hjson.org/) that is basically a more forgiving json.

## Bundler-oriented configuration
This library is made so that a configuration is read in order to be available to bundle or be used by the running program.

### Files list

The file names that will be checked will be composed of two parts. File names are composed of parts separated with dots.

`[machine].[build].[ext]`

Extensions `yaml`, `yml` then `json` will be tried in the first pass. All will be taken if given.

#### 1. Machine-dependant
The first file-name part will be `default`, `[hostname]` or `local`.
The hostname of a machine can be queried to have a config file that applies to one machine. The `local` files are meant to not be tracked by your version control system.
```
[.gitignore]
config/local.*
```
#### 2. Build-dependant

When gathering the configuration, you give the build specifications - an array of string. This let you specify the instance, production state, and whatever agnostically. For a client/server application, you could have the possible specs `['client', 'dev']`, `['server', 'prod']` or combinations.

The specification `['A', 'B', 'C']` will give these build names: `['', 'A', 'B', 'C', 'A.B', 'A.C', 'B.C', 'A.B.C']`

Therefore, if your config folder contains a file `local.server.dev.json`, this file will be used only in case of server-dev build to override a `default.yaml` config.

#### Programatic configurations

The first pass will read all the static configurations (`yaml` and `json`) then a second pass will read all the `js` files the same way and execute them with one global argument : `config`, that is the config object as described [here](https://www.npmjs.com/package/merge-config#api).

Exemple of programatic configuration :
```javascript
config.set('db:url', 'mongodb://'+config.get('db:server')+':'+config.get('db:port'));
```

## Installation and usage
```
npm install bundle-config
```
## Manually
```typescript
const extract = require('bundle-config');
```
```ts
function extract(path: string = 'config', specs: string[] = [], env: string[] = null, argv: string[] = null)
```
This function returns the configuration object extracted from a folder and the environment.
* `path` is the path of the folder containing the config files
* `specs` is the build-specification
* `env` is the list of environment variables name to include in the configuration
* `argv` is the list of command-line parameter names to include in the configuration

For `env` and `argv`, please refer to [merge-config](https://www.npmjs.com/package/merge-config) on which this library is built
## fuse-box
A plugin is implemented for [fuse-box](http://fuse-box.org) users.
In your `fuse.js` file, import and use the plugin like this:
```javascript
const {ConfigPlugin} = require('bundle-config/fuse-box');

...
//either
const fuse = FuseBox.init({
	...,
	plugins: [
		...,
		ConfigPlugin({
			specs: [production?'prod':'dev']
		})
	]
});
...
//or
fuse.bundle('dest/name')
	.plugin(ConfigPlugin({
		specs: [production?'prod':'dev']
	}))
```

The plugin will add the parts of the bundle name (separated in the bundle name by `/` that will become file-name part separated with `.`) and target (`browser`/`server`/...) in front of the specifications.

In the case of a bundle named `myDest/myName`, this would look also for files like `default.myDest.prod.yaml` or `default.myDest.myName.prod.yaml`. This is useful when there are bundles like `client/app`, `client/vendor`, `server/app`, etc. that will read files like `default.server.yml`, `local.vendor.json`, etc.

In the bundled files, we can use
```typescript
import * as config from 'config'
import {db} from 'config'
```

### Plugin options

* `name?: string`
The name used for importing the configuration in the bundled files. Defaults to `"config"`

The next ones are given to the extractor (all as-is except for `specs` that has the bundle name added)
* `path?: string`
*	`specs?: string[]`
*	`env?: string[]`
*	`argv?: string[]`

## Host-name
To find out the exact host-name used for a machine, install the package and in the dist folder is a stand-alone `query-hostname.js` script that can be directly executed by node to display the current machine host-name.