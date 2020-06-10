'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('token').unique();
        table.integer('account_id').unsigned().notNullable().references('accounts.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
