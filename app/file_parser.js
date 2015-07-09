var fs = require('fs'),
    //absolute path to the file to be parsed
    fileName = process.argv[2],
    //load node.js stream module 
    stream = require('stream');

function fileParser(lineNumber, callback) {
    //create new transform stream - allows us to stream in the file and parse the chunks
    //into lines before streaming out the lines to their destinaion 
    //inspiration from - https://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/
    var liner = new stream.Transform({objectMode: true}),
        //index used in handleData callback function below
        index = 0,
        lineNumberInt = parseInt(lineNumber),
        //creates a read stream to stream the date into the transform stream
        source = fs.createReadStream(fileName);
    //load transform method
    liner._transform = require('./util/transform');
    //load flush method
    liner._flush = require('./util/flush');

    console.log('using File Parser');
    //pipe the readstream to the transform stream
    source.pipe(liner);

    //fires when transformed data (in this case, lines) 
    //is available; callback immediately processes the line (flowing mode)
    liner.on('data', handleData);
    //when the transform stream ends, fire the callback
    //in this case the stream will end when the entire file is parsed
    //and no index matching the line number has been found
    liner.on('end', handleEnd);

    //if the value of index matches the line number then pass the line to the callback;
    //if not, then increment the index by 1; 
    //this function is called again immediately when a new line is available
    function handleData(line) {
        if (index === lineNumberInt) {
            callback(null, line);
            liner.end();
        } else {
            index++;
        }   
    }
    //if when the end of the file is reached without a match, return an error
    function handleEnd() {
        callback('File end reached without finding line', null);
    }
}

module.exports = fileParser;