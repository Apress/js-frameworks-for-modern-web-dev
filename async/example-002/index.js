'use strict';
var http = require('http');
var url = require('url');
var db = require('./database');
var path = require('path');

var httpd = require('../httpd');

var SCRIPTS_PATH = path.join(__dirname, 'public', 'scripts');
var VIEWS_PATH = path.join(__dirname, 'views');

var routes = {
  'GET': {
    '^\/$': function (req, cb) {
      var redirect = httpd.asRedirect(cb);
      redirect('/async-parallel');
    },

    '^\/async-parallel$': function (req, cb) {
      cb = httpd.asView(cb);
      cb(200, path.join(VIEWS_PATH, 'async-parallel.html'));
    },

    '^\/scripts\/(.*)$': function (req, cb) {
      var scriptPath = req.params[0];
      cb = httpd.asScript(cb);
      cb(200, path.join(SCRIPTS_PATH, scriptPath));
    },

    '^\/user\/([\\d]+)$': function (req, cb) {
      var userID = Number(req.params[0]);
      cb = httpd.asJSON(cb);
      db.users.find({id: userID}, function (err, user) {
        if (err) {
          return cb(500, err);
        }
        if (!user) {
          err = {message: 'The user cannot be found'};
          return cb(404, err);
        }
        cb(200, user);
      });

    },

    '^\/us-states$': function (req, cb) {
      cb = httpd.asJSON(cb);
      db.states.all(function (err, states) {
        if (err) {
          return cb(500, err);
        }
        cb(200, states || []);
      });
    }
  }
};

httpd.create(routes, 8080, function () {
  console.log('listening on port 8080');
});
