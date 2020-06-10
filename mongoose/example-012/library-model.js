'use strict';
var mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
  owner: String,
  albums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
  duration: {
    h: {type: Number, default: 0},
    m: {type: Number, default: 0}
  }
});

librarySchema.pre('save', true, function (next, done) {

  var hours = 0, mins = 0;
  process.nextTick(function () {                // #1
    /*
     * iterate over all albums and add hours
     * and minutes
     */
    this.albums.forEach(function (album) {
      album.tracks.forEach(function (track) {
        hours += track.duration.h;
        mins += track.duration.m;
      });
    });
    /*
     * divide total mins by 60 seconds and
     * add that to hours, then assign remaining
     * minutes back to mins
     */
    hours += (mins / 60);
    mins = (mins % 60);
    this.duration = {h: hours, m: mins};
    done();                                     // #3
  });

  next();                                       // #2
});

var Library = mongoose.model('Library', librarySchema);

module.exports = Library;