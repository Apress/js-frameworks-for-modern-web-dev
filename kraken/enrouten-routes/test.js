'use strict';

var Promise = require('bluebird');
var request = require('request-promise');
var prettyjson = require('prettyjson');
var token;

console.log('Creating session token...');

request({
    'url': 'http://localhost:7000/api/v1/session',
    'method': 'POST',
    'json': true,
    'body': {
        'email': 'john.doe@localhost.site',
        'password': '123abc'
    }
}).then(function(result) {
    token = result.token;
    console.log('Fetching users collection...');
    return request({
        'url': 'http://localhost:7000/api/v1/users',
        'json': true,
        'headers': {
            'token': token
        }
    });
}).then(function(users) {
    console.log(prettyjson.render(users));
    console.log('Destroying session...');
    return request({
        'url': 'http://localhost:7000/api/v1/session',
        'method': 'DELETE',
        'json': true,
        'headers': {
            'token': token
        }
    });
}).then(function(result) {
    console.log('Done.');
}).catch(function(err) {
    console.error(err);
    process.exit(1);
});
