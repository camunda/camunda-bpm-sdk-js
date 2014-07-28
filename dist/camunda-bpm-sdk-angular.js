!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.CamFormSDKAngularJS=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// exposify: CamSDK.Form
var CamundaForm = (window.CamSDK.Form);

var CamundaFormAngular = CamundaForm.extend(
{

  renderForm: function(formHtmlSource) {

    // first add the form to the DOM:
    CamundaForm.prototype.renderForm.apply(this, arguments);

    // second make sure the form is compiled using
    // angular and linked to the current scope
    var self = this;
    var injector = self.containerElement.injector();
    var scope = self.containerElement.scope();
    injector.invoke(['$compile', function($compile) {
      $compile(self.formElement)(scope);
    }]);
  }
});

module.exports = CamundaFormAngular;

},{}],2:[function(_dereq_,module,exports){
'use strict';

var angular = (window.angular);

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
var CamundaSDK = (window.CamSDK);

var CamundaFormAngular = _dereq_('./camunda-form-anguar');

// expose as CamSDK.AngularForm
CamundaSDK.AngularForm = CamundaFormAngular;

module.exports = CamundaFormAngular;


},{"./camunda-form-anguar":1}]},{},[2])
(2)
});