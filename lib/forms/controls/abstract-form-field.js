'use strict';

var BaseClass = require('../../base-class');
var $ = require('./../dom-lib');

function noop() {};

/**
 * An abstract class for the form field controls
 *
 * @class AbstractFormField
 * @memberof CamSDK.form
 *
 */
function AbstractFormField(element, variableManager) {
  this.element = $( element );
  this.variableManager = variableManager;

  this.variableName = null;

  this.initialize();
};

/**
 * @memberof CamSDK.form.AbstractFormField
 * @name selector
 * @type {String}
 */
AbstractFormField.selector = null;


/**
 * @memberof CamSDK.form.AbstractFormField
 * @borrows extend as CamSDK.BaseClass.extend
 * @name extend
 * @type {Function}
 */
AbstractFormField.extend = BaseClass.extend;


/**
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @name initialize
 * @type {Function}
 */
AbstractFormField.prototype.initialize = noop;


/**
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @name applyValue
 * @type {Function}
 */
AbstractFormField.prototype.applyValue = noop;


/**
 * @memberof CamSDK.form.AbstractFormField.prototype
 * @name getValue
 * @type {Function}
 */
AbstractFormField.prototype.getValue = noop;

module.exports = AbstractFormField;

