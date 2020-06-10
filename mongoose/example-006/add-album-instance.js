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
db.once('open', function addAlbumInstance() {

  var album = new Album();
  album.composer = 'nervous_testpilot';
  album.title = 'Frozen Synapse';
  album.price =  8.99;
  album.releaseDate = new Date(2012, 8, 6);
  album.inPublication = true;
  album.genre = ['Dance', 'Electronica', 'Soundtrack'];
  album.tracks = [
    {
      title: 'Welcome to Markov Geist',
      duration: {m: 1, s: 14}
    },
    {
      title: 'Focus',
      duration: {m: 2, s: 8}
    },
    {
      title: 'The Plan',
      duration: {m: 5, s: 55}
    },
    {
      title: 'A Functioning God',
      duration: {m: 5, s: 39}
    },
    {
      title: 'Switch',
      duration: {m: 6, s: 4}
    },
    {
      title: 'Schism',
      duration: {m: 5, s: 46}
    },
    {
      title: 'Concentrate',
      duration: {m: 5, s: 59}
    },
    {
      title: 'Triumph',
      duration: {m: 4, s: 55}
    },
    {
      title: 'Nightpath',
      duration: {m: 5, s: 35}
    },
    {
      title: 'Deeper',
      duration: {m: 2, s: 48}
    },
    {
      title: 'Menu',
      duration: {m: 10, s: 45}
    }
  ];

  album.save(function (err) {
    if (err) return handleError(err);
    console.log('album saved', album);
    process.exit(0);
  });
});