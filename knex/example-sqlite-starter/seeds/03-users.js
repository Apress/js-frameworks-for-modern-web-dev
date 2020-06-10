'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('users').del(),
        knex('users').insert({
            'first_name': 'Steve',
            'last_name': 'Taylor',
            'email': 'steve.taylor@mydomain.com',
            'city_id': 1
        }),
        knex('users').insert({
            'first_name': 'Sally',
            'last_name': 'Smith',
            'email': 'sally.smith@mydomain.com',
            'city_id': 2
        })
    );
};
