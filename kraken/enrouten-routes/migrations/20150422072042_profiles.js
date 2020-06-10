'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('profiles', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.integer('user_id').unsigned().references('users.id').unique();
        table.string('twitter_handle');
        table.string('city');
        table.string('state');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('profiles');
};
