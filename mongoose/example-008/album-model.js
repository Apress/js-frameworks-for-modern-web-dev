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

albumSchema.methods.nextTrack = function (previousTrackTitle) {
  var i = 0, len = this.tracks.length;
  for (i; i < len; i += 1) {
    if (this.tracks[i].title !== previousTrackTitle) {
      continue;
    }
    // return the next track, or, if this is the last track,
    // return the first track
    return this.tracks[i + 1] || this.tracks[0];
  }
  throw new Error('unable to find track ' + previousTrackTitle);
};

albumSchema.methods.findSimilar = function (cb) {
  var criteria = {
    _id: {$ne: this._id},
    genre: {$in: this.genre}
  };
  this.model('Album').find(criteria)
    .exec(cb);
};

albumSchema.virtual('composerInverse').get(function () {
  var parts = this.composer.split(' '); //first last
  if (parts.length === 1) {
    return this.composer;
  }
  return [parts[1], parts[0]].join(', '); //last, first
});

albumSchema.virtual('composerInverse').set(function (inverse) {
  var parts = inverse.split(', '); //last, first
  if (parts.length === 1) {
    this.composer = inverse;
  }
  this.composer = [parts[1], parts[0]].join(' '); //first last
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;