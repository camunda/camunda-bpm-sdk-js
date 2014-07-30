'use strict';

var constants = require('./../constants'),
    AbstractFormField = require('./abstract-form-field'),
    $ = require('./../dom-lib');



/**
 * A field control handler for simple text / string values
 * @class
 * @memberof CamSDK.form
 * @augments {CamSDK.form.AbstractFormField}
 */
var InputFieldHandler = AbstractFormField.extend(
/** @lends CamSDK.form.InputFieldHandler.prototype */
{
  /**
   * Prepares an instance
   */
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
    this.originalValue = this.element.val();

    this.previousValue = this.originalValue;

    // remember variable name
    this.variableName = variableName;

    this.getValue();
  },

  /**
   * Applies the stored value to a field element.
   *
   * @return {CamSDK.form.InputFieldHandler} Chainable method
   */
  applyValue: function() {
    this.previousValue = this.element.val() || '';
    var variableValue = this.variableManager.variableValue(this.variableName);
    if (variableValue !== this.previousValue) {
      // write value to html control
      this.element.val(variableValue);
      this.element.trigger('camFormVariableApplied', variableValue);
    }

    return this;
  },

  /**
   * Retrieves the value from an <input>
   * element and stores it in the Variable Manager
   *
   * @return {*}
   */
  getValue: function() {
    // read value from html control
    var value = this.element.val();
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

