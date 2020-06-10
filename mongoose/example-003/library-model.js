'use strict';
var mongoose = require('mongoose');

var librarySchema = mongoose.Schema({
  owner: String,
  albums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]
});

var Library = mongoose.model('Library', librarySchema);

module.exports = Library;