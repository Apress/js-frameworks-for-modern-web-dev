'use strict';

var Book = require('./lib/book');

Book.fetchAll({
    'withRelated': ['authors']
}).then(function(books) {
    console.log(JSON.stringify(books.toJSON(), null, 4));
}).catch(function(err) {
    console.log(err);
}).finally(process.exit);
