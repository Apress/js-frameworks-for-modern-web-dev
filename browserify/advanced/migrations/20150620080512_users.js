'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('last_signin');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
