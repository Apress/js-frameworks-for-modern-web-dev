'use strict';
var httpd = require('../httpd');
var Album = require('./album-model');

function albumRoutes(routes) {

  /**
   * GET /album(?composer={string}&title={string}&track={string})
   * @param req
   * @param cb
   */
  routes.GET['^\/album(?:\\?.+)?$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var criteria = {};
    if (req.query.composer) {
      criteria.composer = req.query.composer;
    }
    if (req.query.title) {
      criteria.title = req.query.title;
    }
    if (req.query.track) {
      criteria['tracks.title'] = req.query.track;
    }
    Album.find(criteria)
      .lean(true)
      .exec(function (err, albums) {
        if (err) return cb(500, err);
        cb(200, albums);
      });
  };

  /**
   * GET /album/count(?composer={string}&title={string})
   * @param req
   * @param cb
   */
  routes.GET['^\/album\/count(?:\\?.+)?$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var criteria = {};
    if (req.query.composer) {
      criteria.composer = req.query.composer;
    }
    if (req.query.title) {
      criteria.title = req.query.title;
    }
    Album.count(criteria)
      .exec(function (err, count) {
        if (err) return cb(500, err);
        cb(200, count);
      });
  };

  /**
   * GET /album/released/MM-DD-YYYY
   * GET /album/released/MM-DD-YYYY/before
   * GET /album/released/MM-DD-YYYY/after
   * @param req
   * @param cb
   */
  routes.GET['^\/album\/released\/([\\d]{2}-[\\d]{2}-[\\d]{4})(?:\/(before|after))?$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var date = req.params[0];
    var when = req.params[1];

    var criteria = {releaseDate: {}};
    if (when === 'before') {
      criteria.releaseDate.$lt = new Date(date);
    } else if (when === 'after') {
      criteria.releaseDate.$gt = new Date(date);
    } else {
      when = null;
      criteria.releaseDate = new Date(date);
    }

    Album.find(criteria)
      .select('composer title releaseDate')
      .lean(true)
      .exec(function (err, albums) {
        if (err) return cb(500, err);
        if (albums.length === 0) {
          return cb(404, {
            message: 'no albums ' + (when || 'on') + ' release date ' + date
          });
        }
        cb(200, albums);
      });
  };

  /**
   * GET /album/genre/(genre)/related
   * @param req
   * @param cb
   */
  routes.GET['^\/album\/genre\/([a-zA-Z]+)/related$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var principalGenre = req.params[0];
    var criteria = {
      genre: {$in: [principalGenre]}
    };
    Album.find(criteria)
      .lean(true)
      .select('-_id genre')
      .exec(function (err, albums) {
        if (err) return cb(500, err);
        var relatedGenres = [];
        albums.forEach(function (album) {
          album.genre.forEach(function (albumGenre) {
            // don't include the principal genre
            if (albumGenre === principalGenre) return;
            // ensure duplicates are ignored
            if (relatedGenres.indexOf(albumGenre) < 0) {
              relatedGenres.push(albumGenre);
            }
          });
        });
        cb(200, {genre: principalGenre, related: relatedGenres});
      });
  };

  /**
   * GET /album/recommended
   * @param req
   * @param cb
   */
  routes.GET['^\/album\/recommended'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var nowMS = Date.now();
    var twoYearsMS = (365 * 24 * 60 * 60 * 1000 * 2);
    var twoYearsAgo = new Date(nowMS - twoYearsMS);

    var criteria = {
      $or: [
        // match all of these conditions...
        { $and: [{inPublication: true}, {releaseDate: {$gt: twoYearsAgo}}] },
        // OR
        // match all of these conditions...
        { $and: [{genre: {$in: ['Classical']}}, {price: {$gte: 5, $lte: 10}}] }
      ]
    };

    Album.find(criteria)
      .lean(true)
      .select('-_id -tracks')
      .exec(function (err, albums) {
        if (err) return cb(500, err);
        cb(200, albums);
      });
  };

  /**
   * GET /album/{id}
   * @param req
   * @param cb
   */
  routes.GET['^\/album\/([a-z0-9]+)$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var albumID = req.params[0];
    Album.findById(albumID)
      .lean(true)
      .exec(function (err, album) {
        if (err) return cb(500, err);
        cb(200, album);
      });
  };

  /**
   * POST /album
   * @param req
   * @param cb
   */
  routes.POST['^\/album$'] = function (req, cb) {
    console.log(req.body);
    cb = httpd.asJSON(cb);
    var albumJSON = req.body;
    var album = new Album(albumJSON);
    album.save(function (err) {
      if (err) return cb(500, err);
      cb(201, album.toObject());
    });
  };

  /**
   * PUT /album/{id}
   * @param req
   * @param cb
   */
  routes.PUT['^\/album\/([a-z0-9]+)$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var albumID = req.params[0];
    var updatedFields = req.body;
    Album.findByIdAndUpdate(albumID, updatedFields)
      .lean(true)
      .exec(function (err, album) {
        if (err) return cb(500, err);
        cb(200, album);
      });
  };

  /**
   * DELETE /album/{id}
   * @param req
   * @param cb
   */
  routes.DELETE['^\/album\/([a-z0-9]+)$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var albumID = req.params[0];
    Album.findByIdAndRemove(albumID)
      .lean(true)
      .exec(function (err, album) {
        if (err) return cb(500, err);
        cb(200, album);
      });
  };
}

module.exports = albumRoutes;