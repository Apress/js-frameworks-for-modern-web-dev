'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('profiles').del(),
        knex('profiles').insert([
            {
                'id': 1,
                'user_id': 1,
                'twitter_handle': 'johndoe',
                'city': 'Nashville',
                'state': 'Tennessee'
            },
            {
                'id': 2,
                'user_id': 2,
                'twitter_handle': 'janedoe',
                'city': 'Atlanta',
                'state': 'Georgia'
            }
        ])
    );
};
