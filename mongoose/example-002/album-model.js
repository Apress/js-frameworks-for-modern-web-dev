'use strict';
var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
  title: {type: String, required: true, index: true},
  duration: {
    required: true,
    type: {
      m: {type: Number, default: 0},
      s: {type: Number, default: 0}
    }
  }
});

var albumSchema = mongoose.Schema({
  composer: {type: String, required: true, index: true},
  title: {type: String, required: true, index: true},
  price: {type: Number, default: 0.0},
  releaseDate: {type: Date, default: Date.now},
  inPublication: Boolean,
  genre: {type: [String], index: true},
  tracks: [trackSchema]
});

albumSchema.index({composer: 1, title: 1});

albumSchema.path('tracks').validate(function (tracks) {
  return tracks.length > 0;
}, 'Album has no tracks.');

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;