'use strict';

var angular = require('angular'),
    CamundaFormAngular = require('./camunda-form-angular'),
    isType = require('./../../forms/type-util').isType;

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

ngModule.directive('camVariableType', [function() {

  return {

    require: 'ngModel',
    link: function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {

        var type = $attrs.camVariableType;

        ctrl.$setValidity('camVariableType', true );

        if (viewValue || viewValue === false) {

          if (ctrl.$pristine) {
            ctrl.$pristine = false;
            ctrl.$dirty = true;
            $element.addClass('ng-dirty');
            $element.removeClass('ng-pristine');
          }

          if(['Boolean', 'String'].indexOf(type) === -1 && !isType(viewValue, type)) {
            ctrl.$setValidity('camVariableType', false );
          }

        }

        return viewValue;
      };

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('camVariableType', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });

    }};
}]);

module.exports = CamundaFormAngular;

