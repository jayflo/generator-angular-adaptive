'use strict';

/**
 * Register device independent resources with this module.
 *
 * NOTES:
 * 1) Every device specific, module of resources inherits this
 *     module.
 * 2) Put device independent resources in
 *         /app/common/resources
 */
angular.module('app.resources.common', [
    'ngResource'
]);

/*

Example:

angular.module('app.resources.common').factory('myResource', ['$resource',
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
