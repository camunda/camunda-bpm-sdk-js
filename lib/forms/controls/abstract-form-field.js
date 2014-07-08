'use strict';

var BaseClass = require('../../base-class'),
    $ = require('./../dom-lib');

var AbstractFormField = function(element, variableManager) {

  this.element = $( element );
  this.variableManager = variableManager;

  this.variableName = null;

  this.initialize();
};

var noop = function() {};

AbstractFormField.selector = null;
AbstractFormField.prototype.initialize = noop;
AbstractFormField.prototype.applyValue = noop;
AbstractFormField.prototype.getValue = noop;

AbstractFormField.extend = BaseClass.extend;

module.exports = AbstractFormField;

