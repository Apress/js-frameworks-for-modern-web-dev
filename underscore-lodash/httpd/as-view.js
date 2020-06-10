'use strict';
var fs = require('fs');
var path = require('path');
var asHTML = require('./as-html');

module.exports = function asView (cb) {
  cb = asHTML(cb);
  return function (statusCode, viewPath) {
    fs.readFile(viewPath, {encoding: 'utf8'}, function (err, payload) {
      if (err) {
        payload = err.toString();
        statusCode = 404;
      }
      cb(statusCode, payload);
    });
  };
};