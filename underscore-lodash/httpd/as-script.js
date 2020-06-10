'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function asScript(cb) {
  return function (statusCode, scriptPath) {
    fs.readFile(scriptPath, {encoding: 'utf8'}, function (err, payload) {
      if (err) {
        payload = err.toString();
        statusCode = 404;
      }
      cb(
        statusCode,
        payload,
        {'Content-Type': 'text/javascript'}
      );
    });
  };
};