function getLine(lineNumber, callback) {
	lineNumberInt = parseInt(lineNumber)
	console.log("reading from db")

	//get the value from database using the line number as key
	global.db.get(lineNumberInt, function(err, line) {
		//pass the line back to the router
		callback(err, line)
	})
}

module.exports = getLine

