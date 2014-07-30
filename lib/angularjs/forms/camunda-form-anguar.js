'use strict';

// exposify: CamSDK.Form
var CamundaForm = require('./../../forms/camunda-form');

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
  }
});

module.exports = CamundaFormAngular;
