'use strict';

var angular = require('angular'),
    CamundaFormAngular = require('./camunda-form-anguar');

// define embedded forms angular module
var ngModule = angular.module('cam.embedded.forms', []);

/**
 * Exposes 'cam-variable-name' as angular directive making sure
 * that updates to a HTML Control made through the camunda form
 * infrastructure are propagated over ngModel bindings.
 */
ngModule.directive('camVariableName', [function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      elm.on('camFormVariableApplied', function(evt, value) {
        scope.$apply(function() {
          ctrl.$setViewValue(value);
        });
      });

    }
  };
}]);

module.exports = CamundaFormAngular;

