'use strict';

var isArray = Array.isArray;

describe('The events system', function() {
  var Events, obj = {};
  var counters = {
    on: 0,
    once: 0,
    other: 0
  };

  function onEventCB() {
    counters.on++;
  }

  function onceEventCB() {
    counters.once++;
  }

  function otherEventCB() {
    counters.other++;
  }

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
        obj.on('some:event:name', onEventCB);
      }).not.toThrow();

      expect(isArray(obj._events['some:event:name'])).toBe(true);

      expect(obj._events['some:event:name'].indexOf(onEventCB)).toBeGreaterThan(-1);
    });
  });


  describe('`trigger` function', function() {
    it('is a function', function() {
      expect(typeof Events.trigger).toBe('function');
    });


    it('calls the functions assigned to the event', function() {
      expect(function() {
        obj.trigger('some:event:name');
        obj.trigger('some:event:name');
      }).not.toThrow();

      expect(counters.on).toBe(2);
    });
  });


  describe('`once` function', function() {
    it('is a function', function() {
      expect(typeof Events.once).toBe('function');
    });


    it('adds a function', function() {
      expect(function() {
        obj.once('other:event:name', onceEventCB);
      }).not.toThrow();
    });


    it('calls the added function', function() {
      expect(function() {
        obj.trigger('other:event:name');
        // console.info('counters.once', counters.once);
      }).not.toThrow();
    });


    it('removes the function after it has been called', function() {
      expect(function() {
        obj.trigger('other:event:name');
        // console.info('counters.once', counters.once);
      }).not.toThrow();

      expect(counters.once).toBe(1);
    });
  });


  describe('`off` function', function() {
    it('is a function', function() {
      expect(typeof Events.off).toBe('function');
    });


    it('removes a function assigned to an event', function() {
      expect(function() {
        obj.on('some:event:name', otherEventCB);
      }).not.toThrow();

      expect(isArray(obj._events['some:event:name'])).toBe(true);

      expect(obj._events['some:event:name'].length).toBe(2);


      expect(function() {
        obj.off('some:event:name', otherEventCB);
      }).not.toThrow();

      expect(isArray(obj._events['some:event:name'])).toBe(true);

      expect(obj._events['some:event:name'].length).toBe(1);
    });


    it('removes all the functions assigned to an event', function() {
      expect(function() {
        obj.off('some:event:name');
      }).not.toThrow();

      expect(obj._events['some:event:name']).not.toBeDefined();
    });
  });
});
