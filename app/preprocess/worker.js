//worker.js is called as child process to preprocess the file and write
//lines to the database
//NOTE: for more info on what's going on here see /app/file_parser.js, which uses 
//the same techniques

var fs = require('fs'), 
	dbInterface = require('./../db/db_writer'),
	stream = require('stream'),

	//create new transform stream
	liner = new stream.Transform({objectMode: true});
	liner._transform = require('./../util/transform');
	liner._flush = require('./../util/flush');

//when the child process receives the filename from the parent process, start the readstream
process.on('message', createStream);

function createStream(fileName) {
	console.log('inserting lines...');

	//create read stream to stream the file in chunks to the transform stream
	var source = fs.createReadStream(fileName),
		index;

	//pipe the file straem to the 
	source.pipe(liner);

	liner.on('data', handleData);
	liner.on('end', handleEnd);

	function handleData(line){

		//if index has already been assigned a number value, increment by one
		//if not, assign index to zero
     	isNaN(index) ? index = 0 : index++;

     	//write the index (key) and the line (value) to the database
		dbInterface.write(index, line);
	}

	function handleEnd() {

		//close the database connection so it can be opened by the parent process
		dbInterface.close();

		//send a message to the parent process indicating that preprocessing is complete
		process.send("complete");
	}
}