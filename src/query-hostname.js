var oh = require('os-hostname');
oh(function(err, hn) {
	console.log(hn);
});