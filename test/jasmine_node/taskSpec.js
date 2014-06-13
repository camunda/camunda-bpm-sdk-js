'use strict';

describe('The Task resource usage', function() {
  var Task;

  it('does not blow when loading', function() {
    expect(function() {
      Task = require('./../../src/task');
    }).not.toThrow();
  });

  it('has a `path` static property', function() {
    expect(Task.path).toBe('/task');
  });

  describe('instance', function() {
    var instance;

    it('does not blow when instanciating', function() {
      expect(function() {
        instance = new Task();
      }).not.toThrow();
    });


    it('has a `assign` method', function() {
      expect(typeof instance.assign).toBe('function');
    });


    it('has a `delegate` method', function() {
      expect(typeof instance.delegate).toBe('function');
    });


    it('has a `claim` method', function() {
      expect(typeof instance.claim).toBe('function');
    });


    it('has a `unclaim` method', function() {
      expect(typeof instance.unclaim).toBe('function');
    });


    it('has a `resolve` method', function() {
      expect(typeof instance.resolve).toBe('function');
    });


    it('has a `complete` method', function() {
      expect(typeof instance.complete).toBe('function');
    });
  });
});
