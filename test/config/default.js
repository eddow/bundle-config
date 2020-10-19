const pkg = require('../package.json');	//Given from config file' directory
config.set('version', pkg.version);
config.set('db:url', 'mongodb://'+config.get('db:server')+':'+config.get('db:port'));