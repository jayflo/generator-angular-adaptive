'use strict';


/**
 * Every device specific module for this feature inherits this module.
 */
angular.module('<%= feature %>.common', [
    'ngRoute',

    // include helpers
    'app.directives.common',
    'app.resources.common',
    'app.services.common',
])

/**
 * Controls all the routes (for every device type) for this feature.
 */
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '<%= feature %>/{deviceType}/partials/<%= feature %>.html',
                controller: '<%= feature_ctrl %>Ctrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }
])

/**
 * Every device specific controller for this feature inherits from the
 * scope of this controller.
 */
.controller('<%= feature_ctrl %>Ctrl', ['$scope',
    function($scope) {

    }
]);
