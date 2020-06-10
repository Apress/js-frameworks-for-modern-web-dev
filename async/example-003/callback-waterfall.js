'use strict';
var db = require('./database');

function getUser(userID, cb) {
  process.nextTick(function () {
    // pass cb directly to find because
    // it has the same signature:
    // (err, user)
    db.users.find({id: userID}, cb);
  });
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

function showReward(userID, cb) {
  getUser(userID, function (err, user) {
    if (err) {
      return cb(err);
    }
    calcAge(user, function (err, age) {
      if (err) {
        return cb(err);
      }
      reward(age, cb);
    });
  })
}

showReward(1000, function (err, reward) {
  if (err) {
    return console.error(err);
  }
  console.log(reward);
});