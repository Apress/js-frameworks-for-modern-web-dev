'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('feeds', function(table) {
        table.increments().unsigned().primary();
        table.string('name');
        table.string('url');
        table.dateTime('refreshed_at');
        table.integer('user_id').references('users.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('feeds');
};
