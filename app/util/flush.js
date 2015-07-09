//the flush method is called when all file data has been transformed
//functions to output any lastLineData that may still be hanging around
var flush = function (callback) {
		//if there is anything left in lastLineData, push it out
        if (this._lastLineData) this.push(this._lastLineData);
        this._lastLineData = null;
        callback();
};

module.exports = flush;