'use strict';

/**
 * Register device independent directives with this module.
 *
 * NOTES:
 * 1) Every device specific, module of directives inherits this
 *     module.
 * 2) Put device independent directives in
 *         /app/common/directives
 */
angular.module('app.directives.common', []);

/*

Example:

angular.module('app.directives.common').directive('', ['', function(){
    // Runs during compile
    return {
        name: '',
        priority: 1,
        terminal: true,
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: function($scope, $element, $attrs, $transclude) {},
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '',
        templateUrl: '',
        replace: true,
        transclude: true,
        compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {

        }
    };
}]);
*/
