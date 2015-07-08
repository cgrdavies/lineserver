var fs = require('fs'), 
	liner = require('./liner'),
	dbInterface = require('./../db/dbWriter');

process.on('message', createStream);

function createStream(fileName) {
	var source = fs.createReadStream(fileName)
	var index;
	source.pipe(liner)
	console.log('inserting lines...')
	liner.on('readable', function () {
	    var line
	    while (line = liner.read()) {
	     	isNaN(index) ? index = 0 : index++ 
			dbInterface.write(index, line)
	     }
	})
	liner.on('end', function () {
		dbInterface.close()
		process.send("complete");
	})
};