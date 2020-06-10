'use strict';
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var httpd = module.exports = {};

// data formatters
httpd.asJSON = require('./as-json');
httpd.asHTML = require('./as-html');
httpd.asText = require('./as-text');

// file formatters
httpd.asView = require('./as-view');
httpd.asScript = require('./as-script');

// redirects
httpd.asRedirect = require('./as-redirect');

function findHeader(req, header, defaultTo) {
  if (arguments.length < 3) {
    defaultTo = '';
  }
  header = header.toLowerCase();
  for (var headerKey in req.headers) {
    if (!req.headers.hasOwnProperty(headerKey)) {
      continue;
    }
    if (headerKey.toLowerCase() === header) {
      return req.headers[headerKey];
    }
  }
  return defaultTo;
}

function parseRequest(req, cb) {
  var parsedRequest = Object.create(url.parse(req.url, true));
  parsedRequest.method = req.method;
  parsedRequest.body = '';

  req.on('data', function (chunk) {
    parsedRequest.body += chunk.toString();
  });

  req.on('end', function () {
    var err = null;

    var contentType = findHeader(req, 'Content-Type', 'text/plain');
    if (contentType === 'application/json') {
      try {
        parsedRequest.body = JSON.parse(parsedRequest.body);
      } catch (e) {
        console.error('cannot parse request body as JSON');
        err = e;
      }
    } else {
      parsedRequest.body = querystring.parse(parsedRequest.body);
    }

    cb(err, parsedRequest);
  });
}

httpd.create = function (routes, port, cb) {

  function resolveRoute(req) {
    var method = req.method;

    var missingRoute = function (cb) {
      httpd.asHTML(cb)(404, 'invalid route: ' + req.path);
    };

    if (!routes.hasOwnProperty(method)) {
      return missingRoute;
    }

    var methodRoutes = routes[method];
    for (var routeKey in methodRoutes) {
      if (!methodRoutes.hasOwnProperty(routeKey)) {
        continue;
      }
      var regex = new RegExp(routeKey);
      var regexResult = regex.exec(req.path);
      if (regexResult === null) {
        continue;
      }
      var route = methodRoutes[routeKey];
      req.params = regexResult.slice(1).map(function (param) {
        return decodeURIComponent(param);
      });
      return route.bind(this, req);
    }

    return missingRoute;
  }

  /*
   * The http server will handle requests and responses,
   * delegating the lookup logic to routes above.
   */
  var server = http.createServer(function (req, res) {
    function handleResponse(statusCode, payload, headers) {
      console.log('request:', req.method, req.url, statusCode);
      res.writeHead(statusCode, headers || {});
      res.write(payload.toString());
      res.end();
    }

    parseRequest(req, function (err, parsedRequest) {
      if (err) {
        return handleResponse(500, err.message, {'Content-Type': 'text/plain'});
      }

      var route = resolveRoute(parsedRequest);
      route(handleResponse);
    });
  });

  server.listen(port);
  cb(null, server);
};

