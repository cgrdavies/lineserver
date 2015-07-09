var linesController = require('./lines_controller');

function router(request, response) {

		//regex pattern matching '/lines/[any number]'
	var pattern = new RegExp('^\/lines\/[0-9]*$'),

		//a request is valid if the request url matches the regex pattern
		validRequest = pattern.test(request.url),

		//extracts the requested line number from the request url
		lineNumber = request.url.replace(/.*\//, ''),

		//allows reference to parent scope in child scope of router function
		self = this;

	this.sendResponse = function(data) {
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end(data);  
	};

	this.sendError = function(err, statusCode) {
		response.writeHead(statusCode, { "Content-Type": "text/plain" });
		response.end(String(err));
	};

	//callback function invoked when error or response received from lines controller
	this.respond = function(err, data) {
		if (err) self.sendError(err, 413);
		else self.sendResponse(data);
	};

	//if the request is valid per the regex pattern, send the line number and callback function to the lines controller
	if (validRequest) linesController(lineNumber, this.respond);
	//if the request is malformed, send a 400 error
	else this.sendError('Bad Request', 400);
}

module.exports = router;