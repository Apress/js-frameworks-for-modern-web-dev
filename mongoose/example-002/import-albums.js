'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');
var file2json = require('./file2json');
var fs = require('fs');
var path = require('path');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

// connect to the "music" database on localhost;
// the database will be automatically created
// if it does not exist
mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;

db.on('error', handleError);

db.once('open', function importAlbums() {

  var albumsFile = path.join(__dirname, 'albums.json');
  file2json(albumsFile, 'utf8', function (err, albums) {
    if (err) return handleError(err);

    console.log('creating %d albums', albums.length);

    // use the model to create albums in bulk;
    // the collection will be automatically created
    // if it does not exist
    Album.create(albums, function (err) {
      if (err) return handleError(err);
      process.exit(0);
    });
  });
});