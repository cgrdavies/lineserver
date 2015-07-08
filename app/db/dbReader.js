function getLine(lineNumber, callback) {
	console.log("reading from db")

	//var FileQueue = require('filequeue');
  	//var fq = new FileQueue(200);

  	//fq.readFile('C:/Users/Chris/lines/' + lineNumber + '.txt', function(err, line) {
  	//	callback(err, line)
  	//});

	global.db.get(lineNumber, function(err, line) {
		callback(err, line)
	})
	
}

module.exports = getLine

