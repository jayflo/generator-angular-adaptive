'use strict';

/**
 * Register resources for <%= device_type %> devices to this
 * module.
 */
angular.module('app.resources.<%= device_type %>', [
    'app.resources.common',
]);

/*

Example:

angular.module('app.resources.<%= device_type %>').factory('myResource', ['$resource',
        function($resource) {
            return $resource('some/api/:params', {
                params: 'default'
            }, {
                customAction: {
                    method: 'PUT'
                }
            });
        }
    ]);
*/
