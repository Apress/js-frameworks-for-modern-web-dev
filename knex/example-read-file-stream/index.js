'use strict';

var fs = require('fs');
var Writable = require('stream').Writable;

var stream = fs.createReadStream('data.txt');
var out = Writable();
out._write = function(chunk, enc, next) {
    console.log(chunk.toString());
    next();
};
stream.pipe(out);
