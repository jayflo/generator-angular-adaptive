'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var FeatureGenerator = yeoman.generators.NamedBase.extend({

    copyFiles: function() {

        this.template('_app/_feature/_feature.common.js', 'app/feature/home.common.js', {
            feature: this.name,
            feature_ctrl: this.name[0].toUpperCase() + this.name.slice(1),
        });

        var context = {};
        for (var type in this.deviceTypes) {
            var context = {
                device_type: type,
                device_type_ctrl: type[0].toUpperCase() + type.slice(1),

                feature: this.name,
                feature_ctrl: this.name[0].toUpperCase() + this.name.slice(1),
            };

            this.template('_app/_root/_deviceType/_app.deviceType.js', 'app/root/' + type + '/app.' + type + '.js', context);
            this.template('_app/_feature/_deviceType/_feature.deviceType.js', 'app/home/' + type + '/home.' + type + '.js', context);
            this.template('_app/_feature/_deviceType/_feature.deviceType.html', 'app/home/' + type + '/home.' + type + '.html', context);

            this.template('_app/_common/_directives/_deviceType/_app.directives.deviceType.js', 'app/common/directives/' + type + '/app.directives.' + type + '.js', context);
            this.template('_app/_common/_resources/_deviceType/_app.resources.deviceType.js', 'app/common/resources/' + type + '/app.resources.' + type + '.js', context);
            this.template('_app/_common/_services/_deviceType/_app.services.deviceType.js', 'app/common/services/' + type + '/app.services.' + type + '.js', context);
        }
    }
});

module.exports = FeatureGenerator;
