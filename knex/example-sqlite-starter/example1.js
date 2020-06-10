'use strict';

var knex = require('./lib/db');
var colors = require('colors/safe');
var Table = require('cli-table');
var table = new Table({
    'head': ['ID', 'Name', 'Postal Code']
});

console.log(colors.green.underline('Cities'));

knex.select('id', 'name', 'postal_code').from('cities').then(function(users) {
    users.forEach(function(city) {
        table.push([city.id, city.name, city.postal_code]);
    });
    console.log(table.toString());
    process.exit();
});
