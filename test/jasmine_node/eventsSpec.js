'use strict';

function errorThrown(err) {
  console.info('Error', err.stack);
  throw err;
}

var isArray = Array.isArray;

describe('The events system', function() {
  var Events, obj = {};
  var counters = {};
  function testCallback() {}

  it('does not blow when loading', function() {
    expect(function() {
      Events = require('./../../src/events');
    }).not.toThrow();
  });


  describe('`attach` function', function() {
    it('is used to provide events to an object', function() {
      expect(function() {
        Events.attach(obj);
      }).not.toThrow();

      expect(typeof obj.on).toBe('function');

      expect(typeof obj.once).toBe('function');

      expect(typeof obj.off).toBe('function');

      expect(typeof obj.trigger).toBe('function');

      expect(typeof obj._events).toBe('object');
    });
  });


  describe('`on` function', function() {
    it('is a function', function() {
      expect(typeof Events.on).toBe('function');

      expect(function() {
        Events.attach(obj);
      }).not.toThrow();

      expect(typeof obj.on).toBe('function');
    });

    it('adds an event', function() {
      expect(obj).toBeDefined();

      expect(typeof obj._events).toBe('object');

      expect(function() {
        obj.on('some:event:name', testCallback);
      }).not.toThrow();

      expect(isArray(obj._events['some:event:name'])).toBe(true);

      expect(obj._events['some:event:name'].indexOf(testCallback)).toBeGreaterThan(-1);
    });
  });


  describe('`trigger` function', function() {
    it('is a function', function() {
      expect(typeof Events.trigger).toBe('function');
    });
  });


  describe('`once` function', function() {
    it('is a function', function() {
      expect(typeof Events.once).toBe('function');
    });
  });
});
