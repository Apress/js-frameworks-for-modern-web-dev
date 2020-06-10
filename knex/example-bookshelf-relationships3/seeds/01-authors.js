'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('authors').del(),
        knex('authors').insert([
            {
                'id': 1,
                'first_name': 'Tim',
                'last_name': 'Ambler'
            },
            {
                'id': 2,
                'first_name': 'Nicholas',
                'last_name': 'Cloud'
            }
        ])
    );
};
