'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('users').del(),
        knex('users').insert([
            {
                'id': 1,
                'first_name': 'Steve',
                'last_name': 'Taylor',
                'email': 'steve.taylor@mydomain.com'
            },
            {
                'id': 2,
                'first_name': 'Sally',
                'last_name': 'Smith',
                'email': 'sally.smith@mydomain.com'
            },
            {
                'id': 3,
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'john.doe@mydomain.com'
            },
            {
                'id': 4,
                'first_name': 'Jane',
                'last_name': 'Doe',
                'email': 'jane.doe@mydomain.com'
            }
        ])
    );
};
