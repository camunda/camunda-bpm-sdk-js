'use strict';

var angular = require('angular'),
    CamundaFormAngular = require('./camunda-form-angular'),
    isType = require('./../../forms/type-util').isType,
    dateToString = require('./../../forms/type-util').dateToString;

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

        if (viewValue || viewValue === false || type === 'Bytes') {

          if (ctrl.$pristine) {
            ctrl.$pristine = false;
            ctrl.$dirty = true;
            $element.addClass('ng-dirty');
            $element.removeClass('ng-pristine');
          }

          /**
           * This reformates the date into a ISO8601 conform string which will mirror the selected date in local format.
           * TODO: Remove this when it is fixed by angularjs
           *
           * @see https://app.camunda.com/jira/browse/CAM-4746
           *
           */
          if( type === 'Date') {
            ctrl.$viewValue = viewValue = dateToString(viewValue);
          }

          if(['Boolean', 'String', 'Bytes'].indexOf(type) === -1 && !isType(viewValue, type)) {
            ctrl.$setValidity('camVariableType', false );
          }

          if($attrs.type==='file' && type === 'Bytes' && $element[0].files && $element[0].files[0] && $element[0].files[0].size > ($attrs.camMaxFilesize || 5000000)) {
            ctrl.$setValidity('camVariableType', false );
          }

        }

        return viewValue;
      };

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('camVariableType', function() {
        return validate(ctrl.$viewValue);
      });

      $element.bind('change', function() {
        validate(ctrl.$viewValue);
        $scope.$apply();
      });

    }};
}]);

module.exports = CamundaFormAngular;

