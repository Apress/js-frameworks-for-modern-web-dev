'use strict';
var url = require('url');
var path = require('path');
var mongoose = require('mongoose');
var httpd = require('../httpd');
var albumRoutes = require('./album-routes');
var libraryRoutes = require('./library-routes');

var routes = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'DELETE': {}
};

albumRoutes(routes);
libraryRoutes(routes);

function handleError(err) {
  console.error(err);
  process.exit(1);
}

mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;
db.on('error', handleError);
db.once('open', function () {
  httpd.create(routes, 8080, function () {
    console.log('listening on port 8080');
  });
});

