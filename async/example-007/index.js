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
      redirect('/async-retry');
    },

    '^\/async-retry': function (req, cb) {
      cb = httpd.asView(cb);
      cb(200, path.join(VIEWS_PATH, 'async-retry.html'));
    },

    '^\/scripts\/(.*)$': function (req, cb) {
      var scriptPath = req.params[0];
      cb = httpd.asScript(cb);
      cb(200, path.join(SCRIPTS_PATH, scriptPath));
    }
  },

  'POST': {
    '^\/reservation$': function (req, cb) {
      var reservation = req.body;
      cb = httpd.asJSON(cb);
      var err;
      // simulate latency
      setTimeout(function () {
        try {
          db.reservation.create(reservation);
          return cb(200, {
            confirmation: Date.now(),
            seat: reservation.seat
          });
        } catch (e) {
          err = e;
        }
        cb(500, {message: err.message});
      }, 900);
    }
  }
};

httpd.create(routes, 8080, function () {
  console.log('listening on port 8080');
});