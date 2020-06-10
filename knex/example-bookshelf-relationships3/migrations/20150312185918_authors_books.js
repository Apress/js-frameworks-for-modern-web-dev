'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors_books', function(table) {
        table.increments().unsigned().primary().notNullable();
        table.integer('author_id').notNullable().references('authors.id');
        table.string('book_id').notNullable().references('books.id');
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('authors_books');
};
