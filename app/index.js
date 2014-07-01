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
            message: "What is your app's name? "
        }, {
            name: 'deviceTypes',
            message: "Provide a space delimited list of device types to which your app\n \
                      will respond, e.g. 'mobile tablet desktop' (don't use quotes).\n \
                      Default: 'mobile desktop.\n"
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName.len ? props.appName : 'root';
            this.deviceTypes = props.deviceTypes.length ? props.deviceTypes : 'mobile desktop';

            done();
        }.bind(this));
    },

    scaffoldFolders: function() {
        this.rootDir = 'app/' + this.appName;

        // top level
        this.mkdir('app');
        this.mkdir('lib');
        this.mkdir('.tmp');

        this.mkdir('app/styles');
        this.mkdir('app/images');
        this.mkdir(this.rootDir);
        this.mkdir('app/home');
        this.mkdir('app/common');

        this.mkdir('app/common/directives');
        this.mkdir('app/common/resources');
        this.mkdir('app/common/services');
        this.mkdir('app/common/bower_components');

        this.deviceArr = this.deviceTypes.trim().split(' ');
        for (var type in this.deviceArr) {

            this.mkdir('app/styles/' + type);
            this.mkdir('app/images/' + type);

            this.mkdir(this.rootDir '/' + type);
            this.mkdir('app/home/' + type);
            this.mkdir('app/home/' + type + '/partials');

            this.mkdir('app/common/directives/' + type);
            this.mkdir('app/common/resources/' + type);
            this.mkdir('app/common/services/' + type);
        }
    },

    copyMainFiles: function() {
        // configuration files
        this.copy('gruntfile.js', 'Gruntfile.js');
        this.copy('package.json', 'package.json');
        this.copy('bower.json', 'bower.json');
        this.copy('bowerrc', '.bowerrc');
        this.copy('editorcfg', '.editorcfg');
        this.copy('jshintrc', '.jshintrc');
        this.copy('gitignore', '.gitignore');

        this.rootCtrl = this.appName[0].toUpperCase() + this.appName.slice(1) + 'Ctrl';

        // singleton files
        this.template('app/index.html', 'app/index.html', {
            root_ctrl: this.rootCtrl
        });
        this.copy('app/styles/main.common.css', 'app/styles/main.common.css');
        this.template('app/root/app.common.js', this.rootDir + '/app.common.js', {
            root_ctrl: this.rootCtrl
        });
        this.template('app/feature/feature.common.js', 'app/home/home.common.js', {
            feature: 'home',
            featurectrl: 'Home',
        });
        this.copy('app/common/directives/app.directives.common.js', 'app/common/directives/app.directives.common.js');
        this.copy('app/common/resources/app.resources.common.js', 'app/common/resources/app.resources.common.js');
        this.copy('app/common/services/app.services.common.js', 'app/common/services/app.services.common.js');

        // generate device specific scripts
        var context = {};
        for (var type in this.deviceTypes) {
            context = {
                devicetype: type,
                devicetypectrl: type[0].toUpperCase() + type.slice(1),
                feature: 'home',
                featurectrl: 'Home',
                root_ctrl: this.rootCtrl,
            };

            this.template('app/styles/deviceType/main.deviceType.css', 'app/styles/' + type + '/main.' + type + '.css', context);

            this.template('app/root/deviceType/app.deviceType.js', this.rootDir + '/' + type + '/app.' + type + '.js', context);
            this.template('app/feature/deviceType/feature.deviceType.js', 'app/home/' + type + '/home.' + type + '.js', context);
            this.template('app/feature/deviceType/partials/feature.html', 'app/home/' + type + '/partials/home.html', context);

            this.template('app/common/directives/deviceType/app.directives.deviceType.js', 'app/common/directives/' + type + '/app.directives.' + type + '.js', context);
            this.template('app/common/resources/deviceType/app.resources.deviceType.js', 'app/common/resources/' + type + '/app.resources.' + type + '.js', context);
            this.template('app/common/services/deviceType/app.services.deviceType.js', 'app/common/services/' + type + '/app.services.' + type + '.js', context);
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
