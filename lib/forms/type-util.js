'use strict';

var INTEGER_PATTERN = /^-?[\d]+$/;

var FLOAT_PATTERN = /^(0|(-?(((0|[1-9]\d*)\.\d+)|([1-9]\d*))))([eE][-+]?[0-9]+)?$/;

var BOOLEAN_PATTERN = /^(true|false)$/;

var DATE_PATTERN = /^(\d{2}|\d{4})(?:\-)([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)([0-2]{1}\d{1}|[3]{1}[0-1]{1})T(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1}):([0-5]{1}\d{1}):([0-5]{1}\d{1})?$/;

var isType = function(value, type) {
  switch(type) {
    case 'Integer':
    case 'Long':
    case 'Short':
      return INTEGER_PATTERN.test(value);
    case 'Float':
    case 'Double':
      return FLOAT_PATTERN.test(value);
    case 'Boolean':
      return BOOLEAN_PATTERN.test(value);
    case 'Date':
      return DATE_PATTERN.test(value);
  }
};

var convertToType = function(value, type) {

  if(typeof value === 'string') {
    value = value.trim();
  }

  if(type === "String") {
    return value;
  } else if (isType(value, type)) {
    switch(type) {
      case 'Integer':
      case 'Long':
      case 'Short':
        return parseInt(value, 10);
      case 'Float':
      case 'Double':
        return parseFloat(value);
      case 'Boolean':
        return "true" === value;
      case 'Date':
        return value;
    }
  } else {
    throw new Error("Value '"+value+"' is not of type "+type);
  }
};

module.exports = {
  convertToType : convertToType,
  isType : isType
};
