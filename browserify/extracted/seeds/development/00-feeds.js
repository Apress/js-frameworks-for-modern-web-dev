'use strict';

exports.seed = function(knex, Promise) {
    return knex('feeds').insert([
        {
            'name': 'The Verge',
            'url': 'http://www.theverge.com/rss/index.xml',
            'user_id': 1
        },
        {
            'name': 'Ars Technica',
            'url': 'http://feeds.arstechnica.com/arstechnica/index?format=xml',
            'user_id': 1
        }
    ]);
};
