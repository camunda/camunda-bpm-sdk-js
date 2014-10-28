'use strict';

var convertToType = require('./type-util');

/**
 * @class
 * the variable manager is responsible for managing access to variables.
 *
 * Variable Datatype
 *
 * A variable has the following properties:
 *
 *   name: the name of the variable
 *
 *   type: the type of the variable. The type is a "backend type"
 *
 *
 */
function VariableManager() {

  /** @member object containing the form fields. Initially empty. */
  this.variables = { };

  /** @member boolean indicating whether the variables are fetched */
  this.isVariablesFetched = false;

}

VariableManager.prototype.fetchVariable = function(variable) {
  if(this.isVariablesFetched) {
    throw Error('Illegal State: cannot call fetchVariable(), variables already fetched.');
  }
  this.createVariable({ name: variable });
};

VariableManager.prototype.createVariable = function(variable) {
  if(!this.variables[variable.name]) {
    this.variables[variable.name] = variable;
  } else {
    throw new Error('Cannot add variable with name '+variable.name+': already exists.');
  }
};

VariableManager.prototype.destroyVariable = function(variableName) {
  if(!!this.variables[variableName]) {
    delete this.variables[variableName];
  } else {
    throw new Error('Cannot remove variable with name '+variableName+': variable does not exist.');
  }
};

VariableManager.prototype.variable = function(variableName) {
  return this.variables[variableName];
};

VariableManager.prototype.variableValue = function(variableName, value) {

  var variable = this.variable(variableName);

  if(typeof value === 'undefined' || value === null) {
    value = null;

  } else if(value === '' && variable.type !== 'String') {
    // convert empty string to null for all types except String
    value = null;

  } else if(typeof value === "string" && variable.type !== "String") {
    // convert string value into model value
    value = convertToType(value, variable.type);

  }

  if(arguments.length === 2) {
    variable.isDirty = true;
    if(variable.value === value) {
      variable.isDirty = false;
    }
    variable.value = value;
  }

  return variable.value;
};

VariableManager.prototype.isJsonVariable = function(name) {
  var variable = this.variable(name);

  return variable.type === "Object" &&
     variable.valueInfo.serializationDataFormat.indexOf("application/json") !== -1;
};

VariableManager.prototype.variableNames = function() {
  // since we support IE 8+ (http://kangax.github.io/compat-table/es5/)
  return Object.keys(this.variables);
};

module.exports = VariableManager;

