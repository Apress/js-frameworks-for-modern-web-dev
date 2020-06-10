'use strict';

var _ = require('lodash');

module.exports = function(grunt) {

    var adjectives = require(__dirname + '/../lib/adjectives.json');
    var animals = {
        'birds': grunt.file.readJSON(__dirname + '/../lib/animals/birds.json'),
        'fish': grunt.file.readJSON(__dirname + '/../lib/animals/fish.json'),
        'lizards': grunt.file.readJSON(__dirname + '/../lib/animals/lizards.json'),
        'reptiles': grunt.file.readJSON(__dirname + '/../lib/animals/reptiles.json'),
        'mammals': grunt.file.readJSON(__dirname + '/../lib/animals/mammals.json')
    };
    var categories = _.keys(animals);

    var generateName = function(category) {
        var adjective = _.shuffle(adjectives).pop();
        var animal = _.filter(animals[category], function(animal) {
            if (animal[0] === adjective[0]) {
                return true;
            }
        }).pop();
        if (!animal) {
            return generateName(category);
        }
        return adjective + ' ' + animal;
    };

    grunt.registerMultiTask('release-name-generator', function() {
        grunt.log.subhead('Generating release name for: ' + this.target);
        var options = this.options();
        if (!options.category) {
            options.category = _.shuffle(categories).pop();
        } else if (!animals[options.category]) {
            grunt.fail.fatal('Invalid category specified: ' + options.category);
        }
        var name = generateName(options.category);
        grunt.log.oklns('Release name: ' + name);
        grunt.config('release-name-generator.' + this.target + '.name', name);
    });

};
