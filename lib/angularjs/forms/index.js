'use strict';

var angular = require('angular'),
    CamundaFormAngular = require('./camunda-form-angular');

// define embedded forms angular module
var ngModule = angular.module('cam.embedded.forms', []);

/**
 * Exposes 'cam-variable-name' as angular directive making sure
 * that updates to a HTML Control made through the camunda form
 * infrastructure are propagated over ngModel bindings.
 */
ngModule.directive('camVariableName', ['$rootScope', function($rootScope) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      elm.on('camFormVariableApplied', function(evt, value) {
        var phase = $rootScope.$$phase;
        // only apply if not already in digest / apply
        if(phase !== '$apply' && phase !== '$digest') {
          scope.$apply(function() {
            ctrl.$setViewValue(value);
          });
        } else {
          ctrl.$setViewValue(value);
        }
      });

    }
  };
}]);

module.exports = CamundaFormAngular;

