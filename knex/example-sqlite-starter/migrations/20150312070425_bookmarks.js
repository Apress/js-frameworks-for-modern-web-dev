'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('bookmarks', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.string('url').notNullable();
        table.string('label').notNullable();
        table.integer('user_id').unsigned().references('users.id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bookmarks');
};
