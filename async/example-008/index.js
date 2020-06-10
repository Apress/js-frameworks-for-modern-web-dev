'use strict';
var http = require('http');
var url = require('url');
var path = require('path');
var stockService = require('./stock-service');

var httpd = require('../httpd');

var SCRIPTS_PATH = path.join(__dirname, 'public', 'scripts');
var VIEWS_PATH = path.join(__dirname, 'views');

var routes = {
  'GET': {
    '^\/$': function (req, cb) {
      var redirect = httpd.asRedirect(cb);
      redirect('/async-forever');
    },

    '^\/async-forever': function (req, cb) {
      cb = httpd.asView(cb);
      cb(200, path.join(VIEWS_PATH, 'async-forever.html'));
    },

    '^\/scripts\/(.*)$': function (req, cb) {
      var scriptPath = req.params[0];
      cb = httpd.asScript(cb);
      cb(200, path.join(SCRIPTS_PATH, scriptPath));
    },

    '^\/dashboard\/stocks$': function (req, cb) {
      cb = httpd.asJSON(cb);
      cb(200, stockService.refresh());
    }
  }
};

httpd.create(routes, 8080, function () {
  console.log('listening on port 8080');
});