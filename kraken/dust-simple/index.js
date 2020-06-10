'use strict';

var express = require('express');
var adaro = require('adaro');
var app = express();

/**
 * By default, Dust will cache the contents of an application's templates as they are
 * loaded. In a production environment, this is usually the preferred behavior.
 * This behavior will be disabled in this chapter's examples, allowing you to modify
 * templates and see the result without having to restart Express.
 */
app.engine('dust', adaro.dust({
    'cache': false
}));

app.set('view engine', 'dust');
app.use('/', express.static('./public'));

var data =
{
    'report_name': 'North American Countries',
    'languages': ['English', 'Spanish'],
    'misc': {
        'total_population': 565000000
    },
    'countries': [
        {
            'name': 'United States',
            'population': 319999999,
            'english': true,
            'capital': { 'name': 'Washington D.C.', 'population': 660000 }
        },
        {
            'name': 'Mexico',
            'population': 118000000,
            'english': false,
            'capital': { 'name': 'Mexico City', 'population': 9000000 }
        },
        {
            'name': 'Canada',
            'population': 35000000,
            'english': true,
            'capital': { 'name': 'Ottawa', 'population': 880000 }
        }
    ]
};

app.get('/', function(req, res, next) {
    res.render('main', data);
});

app.listen(8000);

console.log('App is now available at: http://localhost:8000');
