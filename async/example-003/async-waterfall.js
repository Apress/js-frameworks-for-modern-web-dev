'use strict';
var async = require('async');
var db = require('./database');

function getUser(userID) {
  // using a factory function to pass in
  // the userID argument and return another
  // function that will match the callback
  // signature that async.waterfall expects
  return function (cb) {
    process.nextTick(function () {
      // pass cb directly to find because
      // it has the same signature:
      // (err, user)
      db.users.find({id: userID}, cb);
    });
  };
}

function calcAge(user, cb) {
  process.nextTick(function () {
    var now = Date.now(),
      then = user.birthDate.getTime();
    var age = (now - then) / (1000 * 60 * 60 * 24 * 365);
    cb(null, Math.round(age));
  });
}

function reward(age, cb) {
  process.nextTick(function () {
    switch (age) {
      case 25: return cb(null, '$100');
      case 35: return cb(null, '$150');
      case 45: return cb(null, '$200');
      default: return cb(null, '$0');
    }
  });
}

async.waterfall([
  getUser(1000),
  calcAge,
  reward
], function (err, reward) {
  if (err) {
    return console.error(err);
  }
  console.log('reward:', reward);
});