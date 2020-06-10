'use strict';
var EOL = require('os').EOL;

function FakeTransaction() {
  this._statements = [];

  this.add = function (statement) {
    this._statements.push(statement);
  };

  this.toString = function () {
    return this._statements.join(EOL);
  };

  this.commit = function (cb) {
    var self = this;
    setTimeout(function () {
      console.log(self.toString().cyan);
      cb();
    }, 1000);
  };
}

module.exports = {
  begin: function (cb) {
    var trx = new FakeTransaction();
    cb(trx);
  }
};