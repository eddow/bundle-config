import config from '../src/config'
config('test/config', ['client', 'prod']).then(cnf=> console.dir(cnf));
