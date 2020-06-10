'use strict';
var crypto = require('crypto');
var sha = crypto.createHash('sha1');

module.exports = {
  changePassword: function (email, password, cb) {
    sha.update(password);
    var passwordHash = sha.digest('hex');
    cb(null, passwordHash);
  }
};