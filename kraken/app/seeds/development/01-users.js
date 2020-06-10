'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('users').del(),
        knex('users').insert([
            {
                'id': 1,
                'first_name': 'John',
                'last_name': 'Doe',
                'email': 'john.doe@localhost.site',
                'password': '$2a$10$7szJRL6Y1WUZBmxWpiBst.Y2qnl2lkCILmRjaQbBz8iKfFjow3eti' // 123abc
            }
        ])
    );
};
