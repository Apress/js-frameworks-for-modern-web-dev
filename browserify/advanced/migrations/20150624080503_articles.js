'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', function(table) {
        table.increments().unsigned().primary();
        table.string('title');
        table.string('author');
        table.string('content');
        table.string('link');
        table.dateTime('published_at');
        table.integer('feed_id').references('feeds.id');
        table.unique(['feed_id', 'link']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
