'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('accounts').del(),
        knex('accounts').insert([
            {
                'id': 1,
                'name': 'Acme Widgets, LLC'
            }
        ])
    );
};
