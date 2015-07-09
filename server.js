var http = require('http');
var cp = require('child_process');
//load the leveldb key/value store driver 
var levelup = require('levelup');

//load the router which will handle http requests
var router = require('./app/router');

//create a node.js child process to handle preprocessing of the 
//file and writing each line to the database
//creates a new V8 instance so the parent's resources are free to 
//handle parsing the file while the file is still preprocessing
var preprocessor = cp.fork('./app/preprocess/worker');

//triggered when the child process sends a message back to the parent 
preprocessor.on('message', function(message) {
	
	//set a global variable so that the lines controller knows to use
	// the database and not parse the file on demand
  	global.processingComplete = true;

  	console.log("Processing Complete... will now read from DB");

  	//only instantiate the database in the parent once the child is finished
  	//preprocessing the file - leveldb can only be used by one process at a time. 
  	global.db = levelup(__dirname + '/mydb');
});

//send the file path (specified as an absolute path) to the child process
preprocessor.send(process.argv[2]);

//create the http server and listen for requests on localhost:1337
http.createServer(router).listen(1337, 'localhost');