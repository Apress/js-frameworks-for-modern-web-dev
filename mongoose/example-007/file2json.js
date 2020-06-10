'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (filePath, encoding, cb) {
  fs.readFile(filePath, {encoding: encoding}, function (err, fileContent) {
    if (err) {
      return cb(err);
    }

    var json = null;
    try {
      json = JSON.parse(fileContent);
    } catch (e) {
      err = e;
    }

    cb(err, json);
  });
};