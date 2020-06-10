'use strict';
var fs = require('fs');
var path = require('path');
var mach = require('mach');

var recipes = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'recipes.json')
));

var app = mach.stack();

app.use(mach.params);
app.use(mach.file, {
  root: path.join(__dirname, 'public'),
  index: true
});

app.get('/recipes', function (conn) {
  return conn.json(200, recipes);
});

app.put('/recipes/:id', function (conn) {
  // the book is saved
  console.log(conn.params);
  return conn.json(200, {});
});

mach.serve(app, 8080);