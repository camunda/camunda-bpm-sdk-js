'use strict';

var angular = require('angular');

// define embedded forms angular module
var ngModule = angular.module('cam.embedded.forms', []);

/**
 * Exposes 'cam-variable-name' as angular directive making sure
 * that updates to a HTML Control made through the camunda form
 * infrastructure are propagated to angular.js.
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

// exposify: CamSDK
var CamundaSDK = require('./../../');

var CamundaFormAngular = require('./camunda-form-anguar');

// expose as CamSDK.AngularForm
CamundaSDK.AngularForm = CamundaFormAngular;

module.exports = CamundaFormAngular;

