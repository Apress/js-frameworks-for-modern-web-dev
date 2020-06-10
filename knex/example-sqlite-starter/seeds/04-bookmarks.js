'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('bookmarks').del(),
        knex('bookmarks').insert([
            {
                'id': 1,
                'user_id': 1,
                'url': 'http://reddit.com',
                'label': 'Reddit'
            },
            {
                'id': 2,
                'user_id': 1,
                'url': 'http://www.theverge.com',
                'label': 'The Verge'
            },
            {
                'id': 3,
                'user_id': 2,
                'url': 'http://www.webappers.com',
                'label': 'WebAppers'
            },
            {
                'id': 4,
                'user_id': 2,
                'url': 'http://arstechnica.com',
                'label': 'Ars Technica'
            }
        ])
    );
};
