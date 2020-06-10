'use strict';
var async = require('async');
var db = require('./database');

var MAX_PAYLOAD_SIZE = 4;
var UPDATE_QUERY = "UPDATE CUSTOMER SET ? = '?' WHERE id = ?;";

var cargo = async.cargo(function (updates, cb) {
  db.begin(function (trx) {
    updates.forEach(function (update) {
      var query = UPDATE_QUERY.replace('?', update.field)
        .replace('?', update.value)
        .replace('?', update.id);
      trx.add(query);
    });
    trx.commit(cb);
  });
}, MAX_PAYLOAD_SIZE);

cargo.saturated = function () {
  console.log('cargo is saturated at ' + cargo.length());
};

cargo.empty = function () {
  console.log('cargo is empty; worker needs tasks');
};

cargo.drain = function () {
  console.log('cargo is drained; no more tasks to handle');
};

var customerUpdates = [ // 9 updates to be processed in payloads of 4
  {id: 1000, field: 'firstName', value: 'Sterling'},
  {id: 1001, field: 'phoneNumber', value: '222-333-4444'},
  {id: 1002, field: 'email', value: 'archer@goodisis.com'},
  {id: 1003, field: 'dob', value: '01/22/1973'},
  {id: 1004, field: 'city', value: 'New York'},
  {id: 1005, field: 'occupation', value: 'Professional Troll'},
  {id: 1006, field: 'twitter', value: '@2cool4school'},
  {id: 1007, field: 'ssn', value: '111-22-3333'},
  {id: 1008, field: 'email', value: 'urmom@internet.com'},
  {id: 1009, field: 'pref', value: 'rememberme=false&colorscheme=dark'}
];

customerUpdates.forEach(function (update) {
  cargo.push(update, function () {
    console.log('done processing', update.id);
  });
});