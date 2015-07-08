var levelup = require('levelup')
var db = levelup(__dirname + '/../../../mydb')

function write(index, line) {

	//var FileQueue = require('filequeue');
	//var fq = new FileQueue(200);
	//var wstream = fq.createWriteStream('C:/Users/Chris/lines/' + index + '.txt');
	//wstream.write(line);
	//wstream.end();
	db.put(index, line, function(err){
		if (err) console.log(err);
	})
}

function close() {
	db.close();
}

module.exports = {
	"close" : close,
	"write" : write
};