/* global describe, require, it, expect: false */

'use strict';

describe('The type-util', function() {

  var convertToType = require('./../../lib/forms/type-util').convertToType;
  var isType = require('./../../lib/forms/type-util').isType;

  it('does convert Integer', function() {

    expect(convertToType('100', 'Integer')).toBe(100);
    expect(convertToType('-100', 'Integer')).toBe(-100);

    expect(function() {
      return convertToType('100.10', 'Integer');
    }).toThrow(new Error("Value '100.10' is not of type Integer"));

  });

  it('does convert Long', function() {
    expect(convertToType('100', 'Long')).toBe(100);
    expect(convertToType('-100', 'Long')).toBe(-100);
    expect(convertToType(' 0 ', 'Long')).toBe(0);

    expect(function() {
      return convertToType('100.10', 'Long');
    }).toThrow(new Error("Value '100.10' is not of type Long"));
  });

  it('does convert Short', function() {
    expect(convertToType('100', 'Short')).toBe(100);
    expect(convertToType('-100', 'Short')).toBe(-100);
    expect(convertToType(' 0 ', 'Short')).toBe(0);

    expect(function() {
      return convertToType('100.10', 'Short');
    }).toThrow(new Error("Value '100.10' is not of type Short"));
  });

  it('does convert Float', function() {

    expect(convertToType('100', 'Float')).toBe(100);
    expect(convertToType('-100', 'Float')).toBe(-100);
    expect(convertToType('100.10', 'Float')).toBe(100.10);
    expect(convertToType('-100.10', 'Float')).toBe(-100.10);

    expect(function() {
      return convertToType('100.10a', 'Float');
    }).toThrow(new Error("Value '100.10a' is not of type Float"));

  });

  it('does convert Double', function() {

    expect(convertToType('100', 'Double')).toBe(100);
    expect(convertToType('-100', 'Double')).toBe(-100);
    expect(convertToType('100.10', 'Double')).toBe(100.10);
    expect(convertToType('-100.10', 'Double')).toBe(-100.10);

    expect(function() {
      return convertToType('100.10a', 'Double');
    }).toThrow(new Error("Value '100.10a' is not of type Double"));
  });

  it('does convert Date', function() {

    expect(convertToType('2013-01-23T13:42:42', 'Date')).toBe('2013-01-23T13:42:42');
    expect(convertToType(' 2013-01-23T13:42:42 ', 'Date')).toBe('2013-01-23T13:42:42');

    expect(function() {
      return convertToType('2013-01-23T13:42', 'Date');
    }).toThrow(new Error("Value '2013-01-23T13:42' is not of type Date"));

    expect(function() {
      return convertToType('2013-01-23T60:42:40', 'Date');
    }).toThrow(new Error("Value '2013-01-23T60:42:40' is not of type Date"));

  });

  it('does convert Boolean', function() {
    expect(convertToType('true', 'Boolean')).toBe(true);
    expect(convertToType(' true', 'Boolean')).toBe(true);
    expect(convertToType(' true ', 'Boolean')).toBe(true);

    expect(convertToType('false', 'Boolean')).toBe(false);
    expect(convertToType(' false', 'Boolean')).toBe(false);
    expect(convertToType(' false ', 'Boolean')).toBe(false);
    expect(convertToType('false ', 'Boolean')).toBe(false);

    expect(function() {
      return convertToType('strue', 'Boolean');
    }).toThrow(new Error("Value 'strue' is not of type Boolean"));
  });

  it('detects Integers', function() {
    expect(isType('100', 'Integer')).toBe(true);
    expect(isType('-100', 'Integer')).toBe(true);
    expect(isType('100-', 'Integer')).toBe(false);
  });

  it('detects Floats', function() {
    expect(isType('100', 'Float')).toBe(true);
    expect(isType('-100', 'Float')).toBe(true);
    expect(isType('-100e10', 'Float')).toBe(true);
    expect(isType('-100.01', 'Float')).toBe(true);
    expect(isType('100-', 'Float')).toBe(false);
  });

  it('detects Booleans', function() {
    expect(isType('true', 'Boolean')).toBe(true);
    expect(isType('false', 'Boolean')).toBe(true);
    expect(isType('wahr', 'Boolean')).toBe(false);
    expect(isType('1', 'Boolean')).toBe(false);
    expect(isType('0', 'Boolean')).toBe(false);
    expect(isType('', 'Boolean')).toBe(false);
  });

  it('detects Dates', function() {
    expect(isType('2013-01-23T13:42:42', 'Date')).toBe(true);
    expect(isType('2013-01-23T27:42:42', 'Date')).toBe(false);
    expect(isType('2013-13-23T13:42:42', 'Date')).toBe(false);
    expect(isType('tomorrow', 'Date')).toBe(false);
    expect(isType('2013-01-23D27:42:42', 'Date')).toBe(false);
  });

});
