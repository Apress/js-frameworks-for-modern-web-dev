'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('authors_books').del(),
        knex('authors_books').insert([
            {
                'author_id': 1,
                'book_id': 1
            },
            {
                'author_id': 2,
                'book_id': 1
            }
        ])
    );
};
