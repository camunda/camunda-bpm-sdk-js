'use strict';

var constants = require('./../constants'),
    AbstractFormField = require('./abstract-form-field'),
    $ = require('./../dom-lib');



/**
 * An field control handler for simple text / string values
 * @class
 * @memberof CamSDK.form
 * @augments {CamSDK.form.AbstractFormField}
 */
var InputFieldHandler = AbstractFormField.extend(
/** @lends CamSDK.form.InputFieldHandler.prototype */
{
  /** @constructs */
  initialize: function() {
    // read variable definitions from markup
    var variableName = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_NAME);
    var variableType = this.element.attr(constants.DIRECTIVE_CAM_VARIABLE_TYPE);

    // crate variable
    this.variableManager.createVariable({
      name: variableName,
      type: variableType
    });

    // remember the original value found in the element for later checks
    this.originalValue = this.element.val() || '';

    this.previousValue = this.originalValue;

    // remember variable name
    this.variableName = variableName;

    this.getValue();
  },

  applyValue: function() {
    this.previousValue = this.element.val() || '';
    var variableValue = this.variableManager.variableValue(this.variableName);
    if (variableValue !== this.previousValue) {
      // write value to html control
      this.element.val(variableValue);
    }
  },

  getValue: function() {
    // read value from html control
    var value = this.element.val() || '';
    // write value to variable
    this.variableManager.variableValue(this.variableName, value);

    return value;
  }

},
/** @lends CamSDK.form.InputFieldHandler */
{

  selector: 'input['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +']'+
           ',textarea['+ constants.DIRECTIVE_CAM_VARIABLE_NAME +']'

});

module.exports = InputFieldHandler;

