'use strict';
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var httpd = require('../httpd');

var SCRIPTS_PATH = path.join(__dirname, 'public', 'scripts');
var VIEWS_PATH = path.join(__dirname, 'views');
var CARDS_PATH = path.join(__dirname, 'dominion-cards.json');

var routes = {
  'GET': {
    '^\/$': function (req, cb) {
      cb = httpd.asView(cb);
      cb(200, path.join(VIEWS_PATH, 'defer.html'));
    },

    '^\/scripts\/(.*)$': function (req, cb) {
      var scriptPath = req.params[0];
      cb = httpd.asScript(cb);
      cb(200, path.join(SCRIPTS_PATH, scriptPath));
    },

    '^\/cards': function (req, cb) {
      cb = httpd.asJSON(cb);
      fs.readFile(CARDS_PATH, {encoding: 'utf8'}, function (err, buffer) {
        if (err) {
          return cb(500, {message: err.message});
        }
        // simulate latency
        setTimeout(function () {
          cb(200, buffer.toString());
        }, 1200);
      });
    }
  }
};

httpd.create(routes, 8080, function () {
  console.log('listening on port 8080');
});
