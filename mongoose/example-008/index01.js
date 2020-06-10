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
  Album.findOne({title: 'Renaissance'})
    .exec(function (err, album) {
      if (err) return handleError(err);

      var nextTrack = album.nextTrack('Fall from Grace');
      console.log('next track:', nextTrack.title);

      album.findSimilar(function (err, albums) {
        if (err) return handleError(err);
        console.log('this album:', album.title, album.genre);
        albums.forEach(function (album) {
          console.log('similar album:', album.title, album.genre);
        });
        process.exit(0);
      });
    });
});

