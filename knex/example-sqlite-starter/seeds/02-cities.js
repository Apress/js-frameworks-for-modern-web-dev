'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('cities').del(),
        knex('cities').insert({
            'id': 1,
            'name': 'Atlanta',
            'state_id': 1,
            'postal_code': '30032'
        }),
        knex('cities').insert({
            'id': 2,
            'name': 'Nashville',
            'state_id': 2,
            'postal_code': '37204'
        })
    );
};
