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
    return DATE_PATTERN.test(dateToString(value));
  }
};

var convertToType = function(value, type) {

  if(typeof value === 'string') {
    value = value.trim();
  }

  if(type === 'String' || type === 'Bytes' || type === 'File') {
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
      return 'true' === value;
    case 'Date':
      return dateToString(value);
    }
  } else {
    throw new Error('Value \''+value+'\' is not of type '+type);
  }
};

/**
 * This reformates the date into a ISO8601 conform string which will mirror the selected date in local format.
 * TODO: Remove this when it is fixed by angularjs
 *
 * @see https://app.camunda.com/jira/browse/CAM-4746
 *
 */
var pad = function(number) {
  return ( number < 10 ) ?  '0' + number : number;
};

var dateToString = function(date) {
  if( typeof date === 'object' && typeof date.getFullYear === 'function' ) {
    var year    = date.getFullYear(),
        month   = pad( date.getMonth() + 1 ),
        day     = pad( date.getDate() ),
        hour    = pad( date.getHours() ),
        min = pad( date.getMinutes() ),
        sec = pad( date.getSeconds() );

    return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec;

  } else {
    return date;

  }
};

module.exports = {
  convertToType : convertToType,
  isType : isType,
  dateToString : dateToString
};
