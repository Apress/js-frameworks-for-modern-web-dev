'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('profiles').del(),
        knex('profiles').insert([
            {
                'user_id': 1,
                'twitter_handle': 'staylor',
                'city': 'Portland',
                'state': 'OR'
            },
            {
                'user_id': 2,
                'twitter_handle': 'ssmith',
                'city': 'Nashville',
                'state': 'TN'
            },
            {
                'user_id': 3,
                'twitter_handle': 'john.doe',
                'city': 'Boston',
                'state': 'MA'
            },
            {
                'user_id': 4,
                'twitter_handle': 'jane.doe',
                'city': 'Atlanta',
                'state': 'GA'
            }
        ])
    );
};
