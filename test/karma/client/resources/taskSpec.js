'use strict';

describe('The Task resource usage', function() {
  var Task;

  it('does not blow when loading', function() {
    expect(function() {
      Task = require('./../../../lib/api-client/resources/task');
    }).not.to.throw();
  });

  it('has a `path` static property', function() {
    expect(Task.path).to.eql('task');
  });

  describe('instance', function() {
    var instance;

    it('does not blow when instatiating', function() {
      expect(function() {
        instance = new Task();
      }).not.to.throw();
    });


    it('has a `assign` method', function() {
      expect(typeof instance.assign).to.eql('function');
    });


    it('has a `delegate` method', function() {
      expect(typeof instance.delegate).to.eql('function');
    });


    it('has a `claim` method', function() {
      expect(typeof instance.claim).to.eql('function');
    });


    it('has a `unclaim` method', function() {
      expect(typeof instance.unclaim).to.eql('function');
    });


    it('has a `resolve` method', function() {
      expect(typeof instance.resolve).to.eql('function');
    });


    it('has a `complete` method', function() {
      expect(typeof instance.complete).to.eql('function');
    });
  });
});
