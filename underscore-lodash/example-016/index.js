'use strict';
var _ = require('underscore');

_.chain(100)
  .times(function makeLyrics (number) {
    if (number === 0) {
      return '';
    }
    return [
      number + ' bottles of beer on the wall!',
      number + ' bottles of beer!',
      'Take one down, pass it around!',
      (number - 1) + ' bottles of beer on the wall!',
      '♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫',
    ].join('\n');
  })
  .tap(function orderLyrics (lyrics) {
    // reverse the array so the song is in order
    lyrics.reverse();
  })
  .map(function makeLoud (lyric) {
    return lyric.toUpperCase();
  })
  .forEach(function printLyrics (lyric) {
    console.log(lyric);
  });