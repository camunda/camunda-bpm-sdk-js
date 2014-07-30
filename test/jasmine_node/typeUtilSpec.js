'use strict';

describe('The type-util', function() {

  var convertToType = require('./../../lib/forms/type-util');

  it('does convert Integer', function() {

    expect(convertToType('100', 'Integer')).toBe(100);
    expect(convertToType('-100', 'Integer')).toBe(-100);

    expect(function() {
      return convertToType('100.10', 'Integer');
    }).toThrow(new Error("Value '100.10' is not an Integer"));

  });

  it('does convert Float', function() {

    expect(convertToType('100', 'Float')).toBe(100);
    expect(convertToType('-100', 'Float')).toBe(-100);
    expect(convertToType('100.10', 'Float')).toBe(100.10);
    expect(convertToType('-100.10', 'Float')).toBe(-100.10);

    expect(function() {
      return convertToType('100.10a', 'Float');
    }).toThrow(new Error("Value '100.10a' is not a Float"));

  });

  it('does convert Date', function() {

    expect(convertToType('2013-01-23T13:42:42', 'Date')).toBe('2013-01-23T13:42:42');
    expect(convertToType(' 2013-01-23T13:42:42 ', 'Date')).toBe('2013-01-23T13:42:42');

    expect(function() {
      return convertToType('2013-01-23T13:42', 'Date');
    }).toThrow(new Error("Value '2013-01-23T13:42' is not a Date"));

    expect(function() {
      return convertToType('2013-01-23T60:42:40', 'Date');
    }).toThrow(new Error("Value '2013-01-23T60:42:40' is not a Date"));

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
    }).toThrow(new Error("Value 'strue' is not a Boolean"));
  });

});
