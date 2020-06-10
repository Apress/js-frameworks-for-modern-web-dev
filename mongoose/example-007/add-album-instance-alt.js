'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');
var file2json = require('./file2json');
var path = require('path');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;
db.on('error', handleError);
db.once('open', function addAlbumInstance() {

  var albumFile = path.join(__dirname, 'album.json');
  file2json(albumFile, 'utf8', function (err, albumJSON) {
    var album = new Album(albumJSON);
    album.save(function (err) {
      if (err) return handleError(err);
      console.log('album saved', album);
      process.exit(0);
    });
  });

});