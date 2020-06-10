var generators = require('yeoman-generator');

/**
 * We create our generator by exporting a class that extends
 * from Yeoman's `Base` class.
 */
module.exports = generators.Base.extend({

    'prompting': function() {

        /**
         * Indicates that this function will execute asynchronously. Yeoman
         * will wait until we call the `done()` function before continuing.
         */
        var done = this.async();

        /**
         * Our generator's `prompt` method (inherited from Yeoman's `Base`
         * class) allows us to define a series of questions to prompt the
         * user with.
         */
        this.prompt([
            {
                'type': 'input',
                'name': 'title',
                'message': 'Project Title',
                'default': 'My Project',
                'validate': function(title) {
                    return (title.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'package_name',
                'message': 'Package Name',
                'default': 'my-project',
                'validate': function(name) {
                    return (name.length > 0 && /^[a-z0-9\-]+$/i.test(name));
                },
                'filter': function(name) {
                    return name.toLowerCase();
                }
            },
            {
                'type': 'input',
                'name': 'description',
                'message': 'Project Description',
                'default': 'My awesome project',
                'validate': function(description) {
                    return (description.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'author',
                'message': 'Project Author',
                'default': 'John Doe',
                'validate': function(author) {
                    return (author.length > 0);
                }
            },
            {
                'type': 'input',
                'name': 'port',
                'message': 'Express Port',
                'default': 7000,
                'validate': function(port) {
                    port = parseInt(port, 10);
                    return (!isNaN(port) && port > 0);
                }
            }
        ], function(answers) {
            this._answers = answers;
            done();
        }.bind(this));

    },

    'writing': function() {

        /**
         * Copies files from our sub-generators `templates` folder to the target
         * project. The contents of each file is processed as a Lodash template
         * before being written to the disk.
         */
        this.fs.copyTpl(
            this.templatePath('**/*'),
            this.destinationPath(),
            this._answers
        );

        this.fs.copyTpl(
            this.templatePath('pkg.json'),
            this.destinationPath('package.json'),
            this._answers
        );

        this.fs.delete(this.destinationPath('pkg.json'));

        this.fs.copyTpl(
            this.templatePath('.bowerrc'),
            this.destinationPath('.bowerrc'),
            this._answers
        );

        this.composeWith('example:route', {
            'args': ['dashboard']
        });

        /**
         * Writes a Yeoman configuration file to the target project's folder.
         */
        this.config.save();

    },

    'install': function() {

        /**
         * Installs various npm modules within the project folder and updates
         * `package.json` accordingly.
         */
        this.npmInstall([
            'express', 'lodash', 'underscore.string', 'browserify',
            'grunt', 'grunt-contrib-concat', 'grunt-contrib-watch',
            'grunt-contrib-compass', 'grunt-concurrent', 'bulk-require',
            'brfs', 'lodash', 'underscore.string', 'bulkify', 'folderify',
            'grunt-open'
        ], {
            'saveDev': false
        });

        /**
         * Installs dependencies defined within `bower.json`.
         */
        this.bowerInstall();

    },

    'end': function() {
        this.log('Your project is ready.');
    }

});
