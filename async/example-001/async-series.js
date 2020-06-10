'use strict';
var async = require('async');
var userService = require('./user-service');
var emailService = require('./email-service');
var nothingToSeeHere = require('./nothing-to-see-here');

function changePassword(email, password) {
  return function (cb) {
    process.nextTick(function () {
      userService.changePassword(email, password, function (err, hash) {
        // new credentials returned as results
        cb(null, {email: email, passwordHash: hash});
      });
    });
  };
}

function notifyUser(email) {
  return function (cb) {
    process.nextTick(function () {
      // the email service invokes the callback with
      // no result
      emailService.notifyPasswordChanged(email, cb);
    });
  };
}

function sendToNSA(email, password) {
  return function (cb) {
    process.nextTick(function () {
      // the nothingToSeeHere service invokes the
      // callback with no result
      nothingToSeeHere.snoop(email, password, cb);
    });
  }
}

var email = 'user@domain.com';
var password = 'foo!1';

var steps = [
  //returns function(cb)
  changePassword(email, password),
  //returns function(cb)
  notifyUser(email),
  //returns function(cb)
  sendToNSA(email, password)
];
async.series(steps, function (err, results) {
  if (err) {
    return console.error(err);
  }
  console.log('new credentials:', results[0]);
});