'use strict';

var _ = require('lodash');
var knex = require('./lib/db');
var Table = require('cli-table');
var table = new Table({
    'head': ['First Name', 'Last Name', 'Email Address', 'Created At']
});

knex.pluck('id').from('cities').where('state_id', '=', 1)
    .then(function(cityIds) {
        return knex.select('id', 'first_name', 'last_name').from('users').whereIn('city_id', cityIds);
    })
    .then(function(users) {
        return [
            users,
            knex.select('*').from('bookmarks').whereIn('user_id', _.pluck(users, 'id'))
        ];
    })
    .spread(function(users, bookmarks) {
        _.each(users, function(user) {
            user.bookmarks = _.filter(bookmarks, function(bookmark) {
                return bookmark.user_id = user.id;
            });
        });
        console.log(JSON.stringify(users, null, 4));
        process.exit();
    })
    .catch(function(err) {
        console.log(err);
    });
