'use strict';

/**
 *  This fake-root module is inherited by all device specific root modules.
 */
angular.module('app.common', [

    // include helpers
    'app.directives.common',
    'app.resources.common',
    'app.services.common',
])

/**
 * Every controller of all device types inherit from the scope of
 * this controller.  Use only for application wide, device INDEPENDENT data.
 * USE SPARINGLY AND WITH CARE!
 */
.controller('<%= root_ctrl %>', ['$scope',
    function($scope) {

    }
]);
