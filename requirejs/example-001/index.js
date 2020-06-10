'use strict';
var mach = require('mach');
var path = require('path');
var app = mach.stack();
app.use(mach.file, path.join(__dirname, 'public'));
mach.serve(app, 8080);