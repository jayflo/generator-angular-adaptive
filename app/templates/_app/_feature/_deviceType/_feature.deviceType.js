'use strict';

angular.module('<%= feature %>.<%= device_type %>', [

    // inherit device specific helpers
    'app.directives.<%= device_type %>',
    'app.resources.<%= device_type %>',
    'app.services.<%= device_type %>',

    // inherit device independent, feature module.
    // Again, we automaticall obtain 'app.helpers.common'
    '<%= feature %>.common',
])

.controller('<%= feature_ctrl %>.<%= device_type_ctrl %>Ctrl', ['$scope',
    function($scope) {

    }
]);
