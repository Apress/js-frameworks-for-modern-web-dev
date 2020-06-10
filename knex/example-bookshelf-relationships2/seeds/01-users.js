'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('users').del(),
        knex('users').insert([
            {
                'id': 1,
                'account_id': 1,
                'first_name': 'Steve',
                'last_name': 'Taylor',
                'email': 'steve.taylor@mydomain.com'
            },
            {
                'id': 2,
                'account_id': 1,
                'first_name': 'Sally',
                'last_name': 'Smith',
                'email': 'sally.smith@mydomain.com'
            }
        ])
    );
};
