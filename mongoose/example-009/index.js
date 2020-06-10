'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');

var lower = Number(process.argv[2] || 0);
var upper = Number(process.argv[3] || lower + 1);

console.log('finding albums between $%s and $%s', lower.toFixed(2), upper.toFixed(2));

function handleError(err) {
  console.error(err);
  process.exit(1);
}

mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;
db.on('error', handleError);
db.once('open', function () {
  Album.inPriceRange(lower, upper, function (err, albums) {
    if (err) return handleError(err);
    console.log('found albums:', albums.length);
    albums.forEach(function (album) {
      console.log(album.title, '$' + album.price.toFixed(2));
    });
    process.exit(0);
  });
});

