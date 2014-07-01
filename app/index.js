'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var AngularAdaptiveGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        }, {
            name: 'deviceTypes',
            message: 'Provide a space delimited list of device types to which your app will respond.'
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.deviceTypes = props.deviceTypes;

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.mkdir('app');
        this.mkdir('lib');
        this.mkdir('.tmp');

        this.mkdir('app/styles');
        this.mkdir('app/images');

        this.mkdir('app/root');
        this.mkdir('app/home');
        this.mkdir('app/common');
        this.mkdir('app/common/directives');
        this.mkdir('app/common/resources');
        this.mkdir('app/common/services');
        this.mkdir('app/common/bower_components');

        this.deviceArr = this.deviceTypes.trim().split(' ');
        for (var type in this.deviceArr) {
            this.mkdir('app/root/' + type);
            this.mkdir('app/home/' + type);
            this.mkdir('app/common/' + type);
            this.mkdir('app/common/directives/' + type);
            this.mkdir('app/common/resources/' + type);
            this.mkdir('app/common/services/' + type);
        }
    },

    copyMainFiles: function() {
        // configuration files
        this.copy('_gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('_bowerrc', '.bowerrc');
        this.copy('_editorcfg', '.editorcfg');
        this.copy('_jshintrc', '.jshintrc');
        this.copy('_gitignore', '.gitignore');

        // unique files (non-js)
        this.copy('_app/_index.html', 'app/index.html');
        this.copy('_app/_styles/_main.css', 'app/styles/main.css');

        // common scripts
        this.copy('_app/_root/_app.common.js', 'app/root/app.common.js');
        this.template('_app/_feature/_feature.common.js', 'app/feature/home.common.js', {
            feature: 'home',
            feature_ctrl: 'Home',
        });
        this.copy('_app/_common/_directives/_app.directives.common.js', 'app/common/directives/app.directives.common.js');
        this.copy('_app/_common/_resources/_app.resources.common.js', 'app/common/resources/app.resources.common.js');
        this.copy('_app/_common/_services/_app.services.common.js', 'app/common/services/app.services.common.js');

        // generate device specific scripts
        var context = {};
        for (var type in this.deviceTypes) {
            context = {
                device_type: type,
                device_type_ctrl: type[0].toUpperCase() + type.slice(1),
                feature: 'home',
                feature_ctrl: 'Home',
            };

            this.template('_app/_root/_deviceType/_app.deviceType.js', 'app/root/' + type + '/app.' + type + '.js', context);
            this.template('_app/_feature/_deviceType/_feature.deviceType.js', 'app/home/' + type + '/home.' + type + '.js', context);
            this.template('_app/_feature/_deviceType/_feature.deviceType.html', 'app/home/' + type + '/home.' + type + '.html', context);

            this.template('_app/_common/_directives/_deviceType/_app.directives.deviceType.js', 'app/common/directives/' + type + '/app.directives.' + type + '.js', context);
            this.template('_app/_common/_resources/_deviceType/_app.resources.deviceType.js', 'app/common/resources/' + type + '/app.resources.' + type + '.js', context);
            this.template('_app/_common/_services/_deviceType/_app.services.deviceType.js', 'app/common/services/' + type + '/app.services.' + type + '.js', context);
        }
    },

    runNPM: function() {
        var done = this.async();
        this.npmInstall('', function() {
            console.log("\n Everything Set Up!\n");
            done();
        });
    }
});

module.exports = AngularAdaptiveGenerator;
