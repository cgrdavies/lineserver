var http = require('http');
var cp = require('child_process');

var router = require('./app/routes');
var lineHandler = require('./app/line-handler')
var levelup = require('levelup')

var child = cp.fork('./app/preprocess/worker');

child.on('message', function(message) {
  	global.processingComplete = true;
  	console.log("Processing Complete... will now read from DB");
  	global.db = levelup(__dirname + '/mydb');
});

child.send(process.argv[2]);

http.createServer(router).listen(1337, 'localhost');