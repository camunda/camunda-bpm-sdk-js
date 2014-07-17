'use strict';

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

}

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

  if(arguments.length === 2) {
    variable.isDirty = true;
    if(variable.value === value) {
      variable.isDirty = false;
    }
    variable.value = value;
  }

  return variable.value || '';
};

VariableManager.prototype.variableNames = function() {
  // since we support IE 8+ (http://kangax.github.io/compat-table/es5/)
  return Object.keys(this.variables);
};


module.exports = VariableManager;

