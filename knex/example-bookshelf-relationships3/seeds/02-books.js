'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('books').del(),
        knex('books').insert([
            {
                'id': 1,
                'name': 'Pro JavaScript Frameworks for Modern Web Development'
            }
        ])
    );
};
