'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;
db.on('error', handleError);
db.once('open', function () {
  Album.find({}).exec(function (err, albums) {
    if (err) return handleError(err);

    albums.forEach(function (album) {
      console.log('album.composer:', album.composer);
      var inverse = album.composerInverse;
      console.log('album.composerInverse:', inverse);
      album.composerInverse = inverse;
      console.log('album.composer:', album.composer);
      console.log(/*newline*/);
    });

    process.exit(0);
  });
});

