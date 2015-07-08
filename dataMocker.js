var fs = require('fs');

var numberOfLines = parseInt(process.argv[2]);
var numberOfSentences = parseInt(process.argv[3]);

String.prototype.repeat = function(times) {
   return (new Array(times + 1)).join(this);
};

var string = "rasped Didus papistical unspoil unanimate protragedy Bonaveria Midlander";

for (var i = 0; i<numberOfLines; i++) {
	fs.appendFileSync("test.txt", "line number - " + i + "... " + string.repeat(numberOfSentences) + "...\n"); 
}


