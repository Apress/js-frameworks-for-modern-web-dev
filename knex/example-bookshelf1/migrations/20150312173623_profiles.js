'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('profiles', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.integer('user_id').unsigned().references('users.id').unique();
        table.string('twitter_handle');
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('profiles');
};
