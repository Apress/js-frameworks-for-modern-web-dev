'use strict';

exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('states').del(),
        knex('states').insert({
            'id': 1,
            'name': 'Georgia'
        }),
        knex('states').insert({
            'id': 2,
            'name': 'Tennessee'
        })
    );
};
