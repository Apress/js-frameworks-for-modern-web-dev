'use strict';

var knex = require('./lib/db');
var colors = require('colors/safe');
var Table = require('cli-table');
var table = new Table({
    'head': ['ID', 'Name', 'Created At']
});

console.log(colors.green.underline('States'));

knex.select('id', 'name', 'created_at').from('states').then(function(users) {
    users.forEach(function(city) {
        table.push([city.id, city.name, city.created_at]);
    });
    console.log(table.toString());
    process.exit();
});
