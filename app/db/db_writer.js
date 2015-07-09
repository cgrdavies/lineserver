var levelup = require('levelup'),
	db = levelup(__dirname + '/../../mydb')

function write(index, line) {
	db.put(index, line, function(err){
		if (err) console.log(err)
	})
}

function close() {
	db.close()
}

module.exports = {
	"close" : close,
	"write" : write
}