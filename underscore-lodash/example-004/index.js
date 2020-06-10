'use strict';
var _ = require('underscore');

var urls = [
  {scheme: 'http', host: 'underscorejs', domain: '.org'},
  {scheme: 'http', host: 'lodash', domain: '.com'},
  {scheme: 'http', host: 'ecmascript', domain: '.org'},
];

var grouped = _.groupBy(urls, 'domain');

console.log(grouped);

/*
{
  '.org': [
    { scheme: 'http', host: 'underscorejs', domain: '.org' },
    { scheme: 'http', host: 'ecmascript', domain: '.org' }
  ],
  '.com': [
    { scheme: 'http', host: 'lodash', domain: '.com' }
  ]
}
*/