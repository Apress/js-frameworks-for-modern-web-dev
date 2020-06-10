'use strict';
var httpd = require('../httpd');
var Album = require('./album-model');

function albumRoutes(routes) {

  /**
   * GET /album(?composer={string}&title={string})
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
    Album.find(criteria)
      .sort({composer: 1, title: 1})
      .lean(true)
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