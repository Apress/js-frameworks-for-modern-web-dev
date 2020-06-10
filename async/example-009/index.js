'use strict';
var async = require('async');
var http = require('http');

var MAX_WORKERS = 3;
var results = {};

var queue = async.queue(function (url, cb) {
  results[url] = '';
  http.get(url, function (res) {
    results[url] = res.statusCode + ' Content-Type: ' + res.headers['content-type'];
    cb(null);
  }).on('error', function (err) {
    cb(err);
  });
}, MAX_WORKERS);

queue.saturated = function () {
  console.log('queue is saturated at ' + queue.length());
};

queue.empty = function () {
  console.log('queue is empty; last task being handled');
};

queue.drain = function () {
  console.log('queue is drained; no more tasks to handle');
  Object.keys(results).forEach(function (url) {
    console.log(url, results[url]);
  });
  process.exit(0);
};

var urls = [ // 9 urls
  'http://www.apress.com',
  'http://www.nodejs.org',
  'http://www.npmjs.org',
  'http://www.nicholascloud.com',
  'http://www.devlink.net',
  'http://javascriptweekly.com',
  'http://nodeweekly.com',
  'http://www.reddit.com/r/javascript',
  'http://www.reddit.com/r/node'
];

urls.forEach(function (url) {
  queue.push(url, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('done processing', url);
  });
});