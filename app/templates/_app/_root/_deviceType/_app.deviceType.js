'use strict';

/**
 *  This module designates the root of the application for
 *  <%= device_type %> devices.
 *
 *  That is, this module is bootstrapped by angular when your app is
 *  accessed from <%= device_type %> devices.
 */
angular.module('app.<%= device_type %>', [

    // inherit device specific helpers
    'app.directives.<%= device_type %>',
    'app.resources.<%= device_type %>',
    'app.services.<%= device_type %>',

    // inherit device independent fake-root module
    // Note, we automatically inherit the
    // 'app.helpers.common' helpers
    'app.common',

    // inherit device specific features
    // Note, we automatically inherit 'feature.common'
    // modules.
    'home.<%= device_type %>',
])

/**
 * Every controller associated with <%= device_type %> devices inherits
 * from the scope of this controller.  Use only for application wide data.
 * USE SPARINGLY AND WITH CARE!
 */
.controller('Root.<%= device_type_ctrl %>Ctrl', ['$scope',
    function($scope) {

    }
]);
