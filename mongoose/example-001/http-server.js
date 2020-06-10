// http-server.js
'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');
var http = require('http');
var url = require('url');

/*
 * The http server will handle requests and responses
 */
var server = http.createServer(function (req, res) {
  Album.find({}, {composer: 1}, function (err, albums) {
    var statusCode = err ? 500 : 200;
    var payload = err ? err : albums;
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(payload, null, '  '));
    res.end();
  });
});

/*
 * Connect to the MongoDB instance and report
 * errors if any occur.
 */
mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;

db.on('error', function (err) {
  console.error(err);
  process.exit(1);
});

db.once('open', function () {
  /*
   * The MongoDB connection is open, start
   * listening for HTTP requests.
   */
  server.listen(8080);
  console.log('listening on port 8080');
});