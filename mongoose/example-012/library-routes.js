'use strict';
var httpd = require('../httpd/index');
var Library = require('./library-model');

function libraryRoutes(routes) {

  /**
   * GET /library?
   * @param req
   * @param cb
   */
  routes.GET['^\/library(?:\\?.+)?$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var criteria = {};
    if (req.query.owner) {
      criteria.owner = {
        $regex: '^.*' + req.query.owner + '.*$',
        $options: 'i'
      }
    } else {
      return cb(404, {message: 'please specify an owner'});
    }
    Library.find(criteria)
      .populate('albums')
      .exec(function (err, libraries) {
        if (err) return cb(500, err);
        cb(200, libraries);
      });
  };

  /**
   * GET /library/(id)
   * @param req
   * @param cb
   */
  routes.GET['^\/library\/([a-z0-9]+)$'] = function (req, cb) {
    cb = httpd.asJSON(cb);
    var libraryID = req.params[0];
    Library.findById(libraryID)
      .populate('albums')
      .lean(true)
      .exec(function (err, library) {
        if (err) return cb(500, err);
        if (!library) return cb(404, {
          message: 'no library found for ID ' + libraryID
        });
        cb(200, library);
      });
  };
}

module.exports = libraryRoutes;