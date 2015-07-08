var fs = require('fs');
var fileName = process.argv[2];
var stream = require('stream')

function fileParser(lineNumber, callback) {
    var liner = new stream.Transform( { objectMode: true } )
 
    liner._transform = function (chunk, encoding, done) {
        var data = chunk.toString()
        if (this._lastLineData) data = this._lastLineData + data

        var lines = data.split('\n')
        this._lastLineData = lines.splice(lines.length-1,1)[0]

        lines.forEach(this.push.bind(this))
        done()
    }
     
    liner._flush = function (done) {
        if (this._lastLineData) this.push(this._lastLineData)
        this._lastLineData = null
        done()
    }

    console.log('using fileparser')
    var source = fs.createReadStream(fileName);
    var index = 0; 
    source.pipe(liner);
    liner.on('readable', function() {
        var line
        while (line = liner.read()) {
            if (index == parseInt(lineNumber)) {
                callback(null, line)
                liner.end()
                break
            } else {
                index++
            }
        }
    })

    liner.on('end', function(success) {
        if(!success) {
    	   callback('File end reached without finding line', null);
        }
    });
};

module.exports = fileParser;