function getLine(lineNumber, callback) {
	console.log("reading from db")
	global.db.get(lineNumber, function(err, line) {
		callback(err, line)
	})
}

module.exports = getLine

