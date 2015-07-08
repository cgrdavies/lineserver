var lineHandler = require('./line-handler');

var processingComplete = false;

function requestHandler(req, res) {

  //regular expression to match any request url in form of "/lines/" + any number. e.g. "/lines/123456"
  var pattern = new RegExp('\/lines/\'*[0-9]');

  // If the requested url matches the regex pattern, pass the request
  // and response objects to the request handler
  if (pattern.test(req.url)) {
    lineHandler.handleLineRequest(req.url.replace(/.*\//, ''), function(err, line) {
      if (err) {
        console.log(err);
        res.writeHead(413, { "Content-Type": "text/plain" });
        res.end(String(err))
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(line);      
      }
    });
  }

  //If the requested url does not match the regex pattern, return a 404 error
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error 404 - Requested Resource Does Not Exist");
  }

}

module.exports = requestHandler