'use strict';

var constants = require('./../constants'),
    AbstractFormField = require('./abstract-form-field'),
    $ = require('./../dom-lib');

var InputFieldHandler = AbstractFormField.extend({

  initialize: function() {
    // read variable definitions from markup
    var variableName = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
    var variableType = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_TYPE);

    // crate variable
    this.variableManager.createVariable({
      name: variableName,
      type: variableType
    });

    // remember variable name
    this.variableName = variableName;
  },

  applyValue: function() {
    // write value to html control
    this.element.val(this.variableManager.variableValue(this.variableName));
  },

  getValue: function() {
    // read value from html control
    var value = this.element.val();
    // write value to variable
    this.variableManager.variableValue(this.variableName, value);
  }

}, {

  selector: 'input['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +'],textarea['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +']'

});

module.exports = InputFieldHandler;

