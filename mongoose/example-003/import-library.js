'use strict';
var mongoose = require('mongoose');
var Album = require('./album-model');
var Library = require('./library-model');
var file2json = require('./file2json');
var fs = require('fs');
var path = require('path');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

function resolveAlbums(libraryJSON, cb) {
  /*
   * [3] use a compound $or criteria to look up multiple
   * album documents
   */
  var albumCriteria = {
    $or: libraryJSON.albums
  };

  Album.find(albumCriteria, cb);
}

mongoose.connect('mongodb://localhost/music');
var db = mongoose.connection;
db.on('error', handleError);
db.once('open', function importLibrary () {

  /*
   * [1] read the library.json file data and convert it to
   * a normal JS object
   */
  var libraryFile = path.join(__dirname, 'library.json');
  file2json(libraryFile, 'utf8', function (err, libraryJSON) {
    if (err) return handleError(err);

    /*
     * [2] look up album documents that match each composer/title
     * in the library JSON data
     */
    resolveAlbums(libraryJSON, function (err, albumDocuments) {
      if (err) return handleError(err);

      console.log('creating library');

      /*
       * [4] assign the album documents to the library object
       */
      libraryJSON.albums = albumDocuments;

      /*
       * [5] then create a library document from the JSON data and
       * save the document
       */
      var libraryDocument = new Library(libraryJSON);

      libraryDocument.save(function (err) {
        if (err) return handleError(err);
        process.exit(0);
      });
    });

  });
});