var generators = require('yeoman-generator');

/**
 * Our generator's default `app` command was created by extending Yeoman's `Base`
 * class. In this example, we extend the `NamedBase` class, instead. Doing so alerts
 * Yeoman to the fact that this command expects one or more arguments. For example:
 * $ yo example:route my-new-route
 */
module.exports = generators.NamedBase.extend({

    'constructor': function(args) {
        this._opts = {
            'route': args[0]
        };
        generators.NamedBase.apply(this, arguments);
    },

    'writing': function() {

        this.fs.copyTpl(
            this.templatePath('index.js'),
            this.destinationPath('public/app/routes/' + this._opts.route + '/index.js'),
            this._opts
        );

        this.fs.copyTpl(
            this.templatePath('template.html'),
            this.destinationPath('public/app/routes/' + this._opts.route + '/template.html'),
            this._opts
        );

    },

    'end': function() {
        this.log('Route `' + this._opts.route + '` created.');
    }

});
