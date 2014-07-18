'use strict';

var BaseClass = require('../../base-class');
var $ = require('./../dom-lib');

function noop() {}

/**
 * An abstract class for the form field controls
 *
 * @class AbstractFormField
 * @abstract
 * @memberof CamSDK.form
 *
 */
function AbstractFormField(element, variableManager) {
  this.element = $( element );
  this.variableManager = variableManager;

  this.variableName = null;

  this.initialize();
}

/**
 * @memberof CamSDK.form.AbstractFormField
 * @abstract
 * @name selector
 * @type {String}
 */
AbstractFormField.selector = null;


/**
 * @memberof CamSDK.form.AbstractFormField
 * @borrows CamSDK.BaseClass.extend as extend
 * @name extend
 * @type {Function}
 */
AbstractFormField.extend = BaseClass.extend;


/**
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @abstract
 * @method initialize
 */
AbstractFormField.prototype.initialize = noop;


/**
 * Applies the stored value to a field element.
 *
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @abstract
 * @method applyValue
 *
 * @return {CamSDK.form.AbstractFormField} Chainable method
 */
AbstractFormField.prototype.applyValue = noop;


/**
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @abstract
 * @method getValue
 */
AbstractFormField.prototype.getValue = noop;

module.exports = AbstractFormField;

