'use strict';

// exposify: CamSDK.Form
var CamundaForm = require('./../../forms/camunda-form');

var angular = require('angular');
var $ = CamundaForm.$;
var constants = require('./../../forms/constants');


var CamundaFormAngular = CamundaForm.extend(
  {

    renderForm: function() {
      var self = this;

      this.formElement = angular.element(this.formElement);

    // first add the form to the DOM:
      CamundaForm.prototype.renderForm.apply(this, arguments);

    // next perform auto-scope binding for all fields which do not have custom bindings
      function autoBind(key, el) {
        var element = $(el);
        if(!element.attr('ng-model')) {
          var camVarName = element.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
          if(camVarName) {
            element.attr('ng-model', camVarName);
          }
        }
      }

      for(var i = 0; i < this.formFieldHandlers.length; i++) {
        var handler = this.formFieldHandlers[i];
        var selector = handler.selector;
        $(selector, self.formElement).each(autoBind);
      }

      this.formElement = angular.element(this.formElement);
    // finally compile the form with angular and linked to the current scope
      var injector = self.formElement.injector();
      if (!injector) { return; }

      var scope = self.formElement.scope();
      injector.invoke(['$compile', function($compile) {
        $compile(self.formElement)(scope);
      }]);
      scope.camForm = this;
    },

    executeFormScript: function(script) {

    // overrides executeFormScript to make sure the following variables / functions are available to script implementations:

    // * $scope
    // * inject

      this.formElement = angular.element(this.formElement);

      var injector = this.formElement.injector();
      var scope = this.formElement.scope();

      /*eslint-disable */
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
      /*eslint-enable */

    },

    fireEvent: function() {

    // overrides fireEvent to make sure event listener is invoked in an apply phase
      this.formElement = angular.element(this.formElement);

      var self = this;
      var args = arguments;
      var scope = this.formElement.scope();

      var doFireEvent = function() {
        CamundaForm.prototype.fireEvent.apply(self, args);
      };

      var injector = self.formElement.injector();
      if (!injector) { return; }

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
