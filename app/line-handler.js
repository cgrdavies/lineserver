var fileParser = require('./fileParser')
var dbReader = require('./db/dbReader')
var processingComplete = false

function handleLineRequest(lineNumber, callback) {
	global.processingComplete ? dbReader(lineNumber, callback) : fileParser(lineNumber, callback)
}

module.exports = {
    "handleLineRequest": handleLineRequest,
    "processingComplete": processingComplete
}