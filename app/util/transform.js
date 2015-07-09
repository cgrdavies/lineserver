//takes chunks of data from the read stream and separates them 
//into individual lines and streams them out again
var transform = function (chunk, encoding, callback) {
	//converts buffer-encoded chunk to string
    var data = chunk.toString();

    //if there is any extra data hanging out from the previous run
    //prepend it to the data string 
    if (this._lastLineData) data = this._lastLineData + data;
    
    //split the string into array elements at the newline character
    var lines = data.split('\n');

    //take the last element of the array (may be a partial line) and 
    //add it to this._lastLineData so we can prepend it to the next chunk
    this._lastLineData = lines.splice(lines.length-1,1)[0];

    //push each individual line element to the output stream
    lines.forEach(this.push.bind(this));

    //indicate that we're ready for the next chunk
    callback();
};

module.exports = transform;