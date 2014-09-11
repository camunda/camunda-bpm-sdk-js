'use strict';

// exposify: CamSDK.Form
var CamundaForm = require('./../../forms/camunda-form');

var angular = require('angular');

var CamundaFormAngular = CamundaForm.extend(
{

  renderForm: function(formHtmlSource) {
    // first add the form to the DOM:
    CamundaForm.prototype.renderForm.apply(this, arguments);

    // second make sure the form is compiled using
    // angular and linked to the current scope
    var self = this;
    var injector = self.formElement.injector();
    var scope = self.formElement.scope();
    injector.invoke(['$compile', function($compile) {
      $compile(self.formElement)(scope);
    }]);
  },

  executeFormScript: function(script) {

    // overrides executeFormScript to make sure the following variables / functions are available to script implementations
    // $scope
    // inject

    var injector = this.formElement.injector();
    var scope = this.formElement.scope();

    (function(camForm, $scope) {

      // hook to create the service with injection
      var inject = function(extensions) {
        // if result is an array or function we expect
        // an injectable service
        if (angular.isFunction(extensions) || angular.isArray(extensions)) {
          injector.instantiate(extensions, { $scope: scope });
        } else {
          throw new Error('Must call inject(array|fn)');
        }
      };

      /* jshint evil: true */
      eval(script);
      /* jshint evil: false */

    })(this, scope);

  },

  fireEvent: function() {

    // overrides fireEvent to make sure event listener is invoked in an apply phase

    var self = this;
    var args = arguments;
    var scope = this.formElement.scope();

    var doFireEvent = function() {
      CamundaForm.prototype.fireEvent.apply(self, args);
    };

    var injector = self.formElement.injector();
    injector.invoke(['$rootScope', function($rootScope) {
      var phase = $rootScope.$$phase;
        // only apply if not already in digest / apply
        if(phase !== '$apply' && phase !== '$digest') {
          scope.$apply(function() {
            doFireEvent();
          });
        } else {
          doFireEvent();
        }

    }]);
  }
});

module.exports = CamundaFormAngular;
