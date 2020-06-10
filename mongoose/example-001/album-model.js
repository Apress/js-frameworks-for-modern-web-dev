'use strict';
var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
  composer: String,
  title: String,
  price: Number,
  releaseDate: Date,
  inPublication: Boolean,
  genre: [String],
  tracks: [
    {
      title: String,
      duration: {
        m: Number,
        s: Number
      }
    }
  ]
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;