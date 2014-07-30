'use strict';

var INTEGER_PATTERN = /^-?[\d]+$/;

var FLOAT_PATTERN = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/;

var BOOLEAN_PATTERN = /^(true|false)$/;

var DATE_PATTERN = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/;


function isInteger(value) {
  return INTEGER_PATTERN.test(value);
}

function isFloat(value) {
  return FLOAT_PATTERN.test(value);
}

function isBoolean(value) {
  return BOOLEAN_PATTERN.test(value);
}

function isDate(value) {
  return DATE_PATTERN.test(value);
}

var convertToType = function(value, type) {

  if(typeof value === 'string') {
    value = value.trim();
  }

  if(type === "String") {
    return value;

  } else if(type === "Integer") {
    if(isInteger(value)) {
      return parseInt(value);
    } else {
      throw Error("Value '"+value+"' is not an Integer");
    }

  } else if(type === "Float") {
    if(isFloat(value)) {
      return parseFloat(value);
    } else {
      throw Error("Value '"+value+"' is not a Float");
    }
    return isFloat(value);

  } else if(type === "Boolean") {
    if(isBoolean(value)) {
      return "true" === value;
    } else {
      throw Error("Value '"+value+"' is not a Boolean");
    }

  } else if(type === "Date") {
    if(isDate(value)) {
      return value;
    } else {
      throw Error("Value '"+value+"' is not a Date");
    }
  }

};

module.exports = convertToType;
