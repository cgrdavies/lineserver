//load the file parser, which parses the file on demand prior to preprocessing completion
var fileParser = require('./file_parser');
//load the database reader
var dbReader = require('./db/db_reader');

function linesController(lineNumber, callback) {
	//if preprocessing is complete, call the database reader, if not call the fileparser
	global.processingComplete ? dbReader(lineNumber, callback) : fileParser(lineNumber, callback);
}

module.exports = linesController;